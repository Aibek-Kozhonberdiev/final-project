from rest_framework.routers import DefaultRouter
from django.urls import path, include

from . import views

router = DefaultRouter()
router.register(r'users', views.ViewSetUser, basename='user')
router.register(r'profiles', views.ViewSetProfile, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
    path('add-delete-point/<int:pk>/', views.PointAdd.as_view(), name='point-add'),
]
