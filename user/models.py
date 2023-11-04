from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


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
    confirmed = models.BooleanField(default=False)
    number_of_completed_games = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class KeyConfirmation(models.Model):
    key = models.CharField(max_length=10)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
