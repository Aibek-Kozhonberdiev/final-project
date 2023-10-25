from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Profile(models.Model):
    description = models.TextField(max_length=300, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatar/', null=True, blank=True)
    point = models.IntegerField(
        default=0,
        validators=[
            MinValueValidator(-150),
            MaxValueValidator(1000)
        ]
    )
    number_of_completed_games = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
