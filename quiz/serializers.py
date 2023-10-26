from datetime import datetime
from rest_framework import serializers

from user.serializers import UserSerializer
from .models import Category, Quiz, Question, Group

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    update = serializers.DateTimeField(default=datetime.now())
    question_set = QuestionSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True, source='cat')

    class Meta:
        model = Quiz
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = '__all__'
