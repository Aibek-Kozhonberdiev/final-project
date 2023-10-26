from rest_framework import viewsets

from .models import Quiz, Category, Question, Group
from .serializers import CategorySerializer, QuestionSerializer, QuizSerializer, GroupSerializer


class ViewSetCategory(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ViewSetQuestion(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ViewSetQuiz(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class ViewSetGroup(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
