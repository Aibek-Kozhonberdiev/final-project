from django.contrib.auth.models import User
from rest_framework import viewsets, status, generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile
from .serializers import UserSerializer, ProfileSerializer
from .paginations import UserResultsSetPagination


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
