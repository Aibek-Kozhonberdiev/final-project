from rest_framework import viewsets

from .models import Quiz, Category, Question, Room
from .serializers import CategorySerializer, QuestionSerializer, QuizSerializer, RoomSerializer
from .permissions import IsAdminOrReadOnly


class ViewSetCategory(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

class ViewSetQuestion(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminOrReadOnly]

class ViewSetQuiz(viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('-create', '-update')
    serializer_class = QuizSerializer
    permission_classes = [IsAdminOrReadOnly]

class ViewSetRoom(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAdminOrReadOnly]
