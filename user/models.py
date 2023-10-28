from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from quiz.models import Room


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


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
