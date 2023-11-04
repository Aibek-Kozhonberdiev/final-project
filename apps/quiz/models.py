import random
from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save, pre_delete, m2m_changed
from django.dispatch import receiver

from apps.user.models import Profile


class Quiz(models.Model):
    title = models.CharField(max_length=150)
    content = models.TextField(max_length=1500, null=True, blank=True)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(default=datetime.now())
    img = models.ImageField(upload_to='quizzes/', null=True, blank=True)
    question = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Quizes'


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.name

class Question(models.Model):
    CHOICES = (
        (1, 'Choice A'),
        (2, 'Choice B'),
        (3, 'Choice C'),
        (4, 'Choice D'),
    )

    img = models.ImageField(upload_to='question_img/', null=True, blank=True)
    text = models.CharField(max_length=300)
    choice_a = models.CharField(max_length=50)
    choice_b = models.CharField(max_length=50)
    choice_c = models.CharField(max_length=50, null=True, blank=True)
    choice_d = models.CharField(max_length=50, null=True, blank=True)
    correct_choice = models.IntegerField(choices=CHOICES)
    time = models.IntegerField(default=20)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='question_set')

    def __str__(self):
        return self.quiz.title

class Room(models.Model):
    CHARS = '1234567890'
    STATUS = (
        ('pendeng', 'pendeng'),
        ('in progress', 'in progress'),
        ('complete', 'complete'),
    )

    name = models.CharField(max_length=100)
    status = models.CharField(max_length=150, choices=STATUS)
    quizzes = models.ForeignKey(Quiz, related_name='group_quiz', on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='rooms')
    private = models.BooleanField(default=False)
    password = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return self.name

    def password_generation(self):
        password = ''
        for i in range(10):
            password += random.choice(self.CHARS)
        return password

    def save(self, *args, **kwargs):
        if self.private == True:
            self.password = self.password_generation()
        super(Room, self).save(*args, **kwargs)


@receiver(post_save, sender=Question)
def update_quiz_question_count(sender, instance, **kwargs):
    """
    instance - model of the instance that was created
    Increase the value of the question field in the linked Quiz model
    """
    instance.quiz.question += 1
    instance.quiz.save()

@receiver(pre_delete, sender=Question)
def delete_quiz_question_count(sender, instance, **kwargs):
    """
    Deleting a question decreases the value
    """
    instance.quiz.question -= 1
    instance.quiz.save()

@receiver(m2m_changed, sender=Room.members.through)
def update_profile_completed_games(sender, instance, action, reverse, model, pk_set, **kwargs):
    """
    To increase the user's "number_of_completed_games" when creating a room
    """
    if action == "post_add":
        for pk in pk_set:
            profile = Profile.objects.get(pk=pk)
            profile.number_of_completed_games += 1
            profile.save()
