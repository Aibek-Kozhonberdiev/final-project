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


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.name

class Question(models.Model):
    CHOICES = (
        ('A', 'Choice A'),
        ('B', 'Choice B'),
        ('C', 'Choice C'),
        ('D', 'Choice D'),
    )

    img = models.ImageField(upload_to='question_img/', null=True, blank=True)
    text = models.CharField(max_length=300)
    choice_a = models.CharField(max_length=50)
    choice_b = models.CharField(max_length=50)
    choice_c = models.CharField(max_length=50, null=True, blank=True)
    choice_d = models.CharField(max_length=50, null=True, blank=True)
    correct_choice = models.CharField(max_length=1, choices=CHOICES)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return self.quiz.title
