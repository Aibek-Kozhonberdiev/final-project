import pytest
from django.contrib.auth.models import User
from apps.quiz.models import Quiz, Category, Question, Room

@pytest.mark.django_db
def test_quiz_creation():
    user = User.objects.create(username="testuser")
    category = Category.objects.create(name="Test Category")
    quiz = Quiz.objects.create(
        title="Test Quiz",
        content="Test Content",
        user=user,  # Associate the quiz with the user
        cat=category
    )
    assert quiz.title == "Test Quiz"
    assert quiz.user == user
    assert quiz.cat == category

@pytest.mark.django_db
def test_question_creation():
    user = User.objects.create(username="testuser")
    category = Category.objects.create(name="Test Category")
    quiz = Quiz.objects.create(
        title="Test Quiz",
        content="Test Content",
        user=user,  # Associate the quiz with the user
        cat=category
    )
    question = Question.objects.create(
        text="Test Question",
        choice_a="Choice A",
        choice_b="Choice B",
        correct_choice=1,
        quiz=quiz
    )
    assert question.text == "Test Question"
    assert question.quiz == quiz

@pytest.mark.django_db
def test_room_creation():
    user = User.objects.create(username="testuser")
    category = Category.objects.create(name="Test Category")
    quiz = Quiz.objects.create(
        title="Test Quiz",
        content="Test Content",
        user=user,  # Associate the quiz with the user
        cat=category
    )
    room = Room.objects.create(
        name="Test Room",
        status="pending",  # Fix the status typo
        quizzes=quiz,
        private=True,
    )
    room.members.set([user])

    assert room.name == "Test Room"
    assert room.quizzes == quiz
    assert room.members.all()[0] == user

@pytest.mark.django_db
def test_update_quiz_question_count_signal():
    user = User.objects.create(username="testuser")
    category = Category.objects.create(name="Test Category")
    quiz = Quiz.objects.create(
        title="Test Quiz",
        content="Test Content",
        user=user,  # Associate the quiz with the user
        cat=category
    )
    question = Question.objects.create(
        text="Test Question",
        choice_a="Choice A",
        choice_b="Choice B",
        correct_choice=1,
        quiz=quiz
    )
    assert quiz.question == 1
