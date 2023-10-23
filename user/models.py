from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    description = models.TextField(max_length=300, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatar/', null=True, blank=True)
    background = models.ImageField(upload_to='background/', null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
