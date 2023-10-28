from django.contrib.auth.models import User
from rest_framework import viewsets

from .models import Profile
from .serializers import UserSerializer, ProfileSerializer
from .paginations import UserResultsSetPagination


class ViewSetProfile(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    pagination_class = UserResultsSetPagination


class ViewSetUser(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserResultsSetPagination


