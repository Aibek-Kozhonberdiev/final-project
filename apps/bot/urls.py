from django.urls import path

from . import views

urlpatterns = [
    path('send_complaint/<int:pk>/', views.ComplaintMessage.as_view(), name='send_complaint'),
]
