import random

from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile, KeyConfirmation
from .serializers import UserSerializer, ProfileSerializer
from .paginations import UserResultsSetPagination
from .my_email import SendGmail


class ViewSetProfile(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-point')
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
        return Response(user_data, status=status.HTTP_201_CREATED)

    def key_check(self, request):
        key = request.data.get('key')
        profile_id = request.data.get('profile_id')
        key_confirmation = get_object_or_404(KeyConfirmation, profile_id=profile_id)
        # Check if the received 'key' doesn't match the one in KeyConfirmation
        if key_confirmation.key != key:
            raise TypeError

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


class PointAdd(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        profile = get_object_or_404(Profile, pk=pk)
        return profile

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

    def post(self, request, pk):
        """
        Handle a POST request to update a Profile's point value.
        """
        point = request.data.get('point')
        profile = self.get_object(pk)

        try:
            self.change_point(profile, point)
            return Response({'detail': 'The operation was successful'})
        except TypeError:
            return Response({'detail': 'Point value is missing'})

class ViewsConfirmed(APIView, SendGmail):
    CHARS = '1234567890'

    def key_generation(self):
        password = ''
        for i in range(10):
            password += random.choice(self.CHARS)
        return password

    def get(self, request, pk):
        profile = get_object_or_404(Profile, pk=pk)

        # Check if a KeyConfirmation already exists for this Profile
        key_confirmation, created = KeyConfirmation.objects.get_or_create(profile=profile)

        if created == False:
            key_confirmation = get_object_or_404(KeyConfirmation, profile=profile)

        key_confirmation.key = self.key_generation()
        key_confirmation.save()

        # Sending the key by email
        text = f"Ваш ключ подтверждения: {key_confirmation.key}"
        self.send_message(text, profile.user.pk)

        return Response({'detail': 'The key was generated successfully'}, status.HTTP_201_CREATED)

    def post(self, request, pk):
        profile = get_object_or_404(Profile, pk=pk)
        key = request.data.get('key')

        key_confirmation = get_object_or_404(KeyConfirmation, profile=profile)
        # Check if the received 'key' matches the key stored in KeyConfirmation
        if key_confirmation.key == key:
            # If the keys match, set the 'confirmed' attribute of the profile to True and save
            profile.confirmed = True
            profile.save()

            return Response({'detail': 'user successfully verified'}, status.HTTP_201_CREATED)

        return Response({'detail': "the key doesn't match"}, status.HTTP_400_BAD_REQUEST)
