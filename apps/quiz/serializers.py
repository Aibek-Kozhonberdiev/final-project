from django.utils import timezone
from rest_framework import serializers

from .models import Category, Quiz, Question, Room
from ..user.models import UserProfile


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

    def user_verification(self, pk):
        profile = UserProfile.objects.get(user=pk)

        # check if the user is verified
        if profile.confirmed != True:
            raise serializers.ValidationError({'detail': "user is not verified"})

    def create(self, validated_data):
        pk = validated_data['user']
        self.user_verification(pk)

        instance = super().create(validated_data)
        return instance


class RoomSerializer(serializers.ModelSerializer):
    password = serializers.CharField(read_only=True)


    class Meta:
        model = Room
        fields = '__all__'

    def checking_the_user_for_credentials(self, user_set, excluded_room_id=None):
        """
        Validates the user's credentials before adding them to the room.
        Checks to see if users are already in other rooms and throws an error if such a room is found.
        """
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
        self.checking_the_user_for_credentials(user_set)  # check user for rooms

        instance = super().create(validated_data)
        return instance

    def update(self, instance, validated_data):
        user_set = validated_data['members']
        excluded_room_id = instance.pk
        self.checking_the_user_for_credentials(user_set, excluded_room_id)  # check user for rooms

        instance = super().update(instance, validated_data)
        return instance
