from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'categories', views.ViewSetCategory)
router.register(r'questions', views.ViewSetQuestion)
router.register(r'quizzes', views.ViewSetQuiz)

urlpatterns = [
    path('', include(router.urls)),
]
