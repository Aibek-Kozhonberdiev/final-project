from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

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


class PointAdd(APIView):
    def get_object(self, pk):
        profile = get_object_or_404(Profile, pk=pk)
        return profile

    def change_point(self, profile, point):
        new_point = profile.point + point
        if new_point > 1000:
            profile.point = 1000
        elif new_point < -150:
            profile.point = -150
        else:
            profile.point += point
        profile.save()

    def post(self, request, pk):
        point = request.data.get('point')
        profile = self.get_object(pk)

        try:
            self.change_point(profile, point)
            return Response({'detail': 'The operation was successful'})
        except TypeError:
            return Response({'detail': 'Point value is missing'})
