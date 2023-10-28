from datetime import datetime
from django.contrib.auth.models import User
from django.db import models


class Quiz(models.Model):
    title = models.CharField(max_length=150)
    content = models.TextField(max_length=1500, null=True, blank=True)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(default=datetime.now())
    img = models.ImageField(upload_to='quizzes/', null=True, blank=True)
    number_of_questions = models.IntegerField(default=0)
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
    STATUS = (
        ('pendeng', 'pendeng'),
        ('in progress', 'in progress'),
        ('complete', 'complete'),
    )

    name = models.CharField(max_length=100)
    status = models.CharField(max_length=150, choices=STATUS)
    question = models.IntegerField(default=0)
    quizzes = models.ForeignKey(Quiz, related_name='group_quiz', on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='rooms')

    def __str__(self):
        return self.name
