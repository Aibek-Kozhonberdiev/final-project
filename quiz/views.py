from rest_framework import viewsets

from .models import Quiz, Category, Question, Room
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

class ViewSetRoom(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = GroupSerializer
