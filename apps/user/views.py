import random

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserProfile, KeyConfirmation
from .serializers import UserSerializer, ProfileSerializer
from .paginations import UserResultsSetPagination
from .my_email import send_message


class ViewSetProfile(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all().order_by('-point')
    serializer_class = ProfileSerializer
    pagination_class = UserResultsSetPagination


class ViewSetUser(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    pagination_class = UserResultsSetPagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        user_data = {
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        text = f'Здравствуйте! '\
               f'Добро пожаловать, {user.username}! Мы рады видеть вас в нашем увлекательном мире викторин и тестов.\n'\
               f'Ваш аккаунт успешно зарегистрирован. Теперь у вас есть доступ к нашей платформе, где вы можете участвовать в увлекательных викторинах, соревноваться с другими игроками и даже создавать своих собственных победителей.\n'\
               'Не забудьте проверить наши последние тесты и статьи на нашем сайте.\n'\
               f'Спасибо, что выбрали {user.username}! Мы желаем вам увлекательного времени и много интересных вопросов.'

        # Sends a greeting to gmail
        send_message(text, user.pk)

        return Response(user_data, status=status.HTTP_201_CREATED)

    def key_check(self, request):
        key = request.data.get('key')
        profile_id = request.data.get('profile_id')
        key_confirmation = get_object_or_404(KeyConfirmation, profile_id=profile_id)
        # Check if the received 'key' doesn't match the one in KeyConfirmation
        if key_confirmation.key != key:
            raise TypeError

    @swagger_auto_schema(
        operation_description='Password changes',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'password': openapi.Schema(type=openapi.FORMAT_PASSWORD),
                'password2': openapi.Schema(type=openapi.FORMAT_PASSWORD),
                'key': openapi.Schema(type=openapi.TYPE_STRING),
                'profile_id': openapi.Schema(type=openapi.TYPE_NUMBER)
            }
        )
    )
    def update(self, request, *args, **kwargs):
        try:
            # Call the key_check method to verify the key
            self.key_check(request)
        except TypeError:
            return Response({'detail': "the key doesn't match"}, status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=kwargs.get('partial', False))
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description='Password changes',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'password': openapi.Schema(type=openapi.FORMAT_PASSWORD),
                'password2': openapi.Schema(type=openapi.FORMAT_PASSWORD),
                'key': openapi.Schema(type=openapi.TYPE_STRING),
                'profile_id': openapi.Schema(type=openapi.TYPE_NUMBER)
            }
        )
    )
    def partial_update(self, request, *args, **kwargs):
        try:
            # Call the key_check method to verify the key
            self.key_check(request)
        except TypeError:
            return Response({'detail': "the key doesn't match"}, status.HTTP_400_BAD_REQUEST)

        response = super().partial_update(request, *args, **kwargs)
        return response


class PointAdd(APIView):
    permission_classes = [permissions.IsAdminUser]

    def change_point(self, profile, point):
        """
        Change the point value of a given Profile object, ensuring it stays within a specific range.
        """
        new_point = profile.point + point
        if new_point > 1000:
            profile.point = 1000
        elif new_point < -150:
            profile.point = -150
        else:
            profile.point = new_point
        profile.save()

    @swagger_auto_schema(
        operation_description='To add and remove points from +10 for a correct answer -3 for an incorrect one',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'point': openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        )

    )
    def post(self, request, pk):
        """
        Handle a POST request to update a Profile's point value.
        """
        point = request.data.get('point')
        profile = get_object_or_404(UserProfile, pk=pk)

        try:
            self.change_point(profile, point)
            return Response({'detail': 'The operation was successful'})
        except TypeError:
            return Response({'detail': 'Point value is missing'})


class ViewsConfirmed(APIView):
    chars = '1234567890'

    def key_generation(self):
        password = ''
        for i in range(10):
            password += random.choice(self.chars)
        return password

    @swagger_auto_schema(operation_description='To generate a key the user by email')
    def get(self, request, pk):
        profile = get_object_or_404(UserProfile, pk=pk)

        # Check if a KeyConfirmation already exists for this Profile
        key_confirmation, created = KeyConfirmation.objects.get_or_create(profile=profile)

        if created == False:
            key_confirmation = get_object_or_404(KeyConfirmation, profile=profile)

        key_confirmation.key = self.key_generation()
        key_confirmation.save()

        # Sending the key by email
        text = f"Ваш ключ подтверждения: {key_confirmation.key}"
        send_message(text, profile.user.pk)

        return Response({'detail': 'The key was generated successfully'}, status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description='Sends a key to verify the user. Which received via email',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'key': openapi.Schema(type=openapi.TYPE_STRING),
            }
        )
    )
    def post(self, request, pk):
        profile = get_object_or_404(UserProfile, pk=pk)
        key = request.data.get('key')

        key_confirmation = get_object_or_404(KeyConfirmation, profile=profile)
        # Check if the received 'key' matches the key stored in KeyConfirmation
        if key_confirmation.key == key:
            # If the keys match, set the 'confirmed' attribute of the profile to True and save
            profile.confirmed = True
            profile.save()

            return Response({'detail': 'user successfully verified'}, status.HTTP_201_CREATED)

        return Response({'detail': "the key doesn't match"}, status.HTTP_400_BAD_REQUEST)
