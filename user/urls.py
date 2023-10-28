from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'users', views.ViewSetUser, basename='user')
router.register(r'profiles', views.ViewSetProfile, basename='profile')

urlpatterns = router.urls
