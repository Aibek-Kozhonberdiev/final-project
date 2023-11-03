from django.utils import timezone
from rest_framework import serializers

from .models import Category, Quiz, Question, Room

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    update = serializers.DateTimeField(default=timezone.now)
    question_set = QuestionSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True, source='cat')
    question = serializers.IntegerField(read_only=True)

    class Meta:
        model = Quiz
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'

    def checking_the_user_for_credentials(self, user_set, excluded_room_id=None):
        for user in user_set:
            existing_room = Room.objects.filter(members=user).exclude(id=excluded_room_id).first()
            if existing_room:
                error = {
                    "detail": f"The user is already in another room.",
                    "user_id": int(user.pk)
                }
                raise serializers.ValidationError(error)

    def create(self, validated_data):
        user_set = validated_data['members']
        self.checking_the_user_for_credentials(user_set)

        room = Room.objects.create(
            name=validated_data['name'],
            status=validated_data['status'],
            quizzes=validated_data['quizzes'],
        )
        room.members.set(user_set)

        return room

    def update(self, instance, validated_data):
        user_set = validated_data['members']
        excluded_room_id = instance.pk
        self.checking_the_user_for_credentials(user_set, excluded_room_id)

        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        instance.quizzes = validated_data.get('quizzes', instance.quizzes)
        instance.members.set(user_set)

        return instance
