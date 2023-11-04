import telebot
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView


class SendMessage:
    def send_message(self, message_text):
        try:
            # settings.PROXY_URL
            bot = telebot.TeleBot(settings.TELEGRAM_KEY)
            bot.send_message(settings.ADMIN_TELEGRAM_ID, message_text)
            return Response({'message': 'The message was successfully sent to Telegram administrator'})
        except Exception as e:
            return Response({'message': 'Error sending message to Telegram: ' + str(e)}, status.HTTP_400_BAD_REQUEST)

class ComplaintMessage(APIView, SendMessage):
    def get_object(self, pk):
        return get_object_or_404(User, pk=pk)

    def post(self, request, pk):
        text = request.data.get('text')
        user = self.get_object(pk)
        message_text = f"Жалоба на пользователя: {user.username}\n{text}"

        return self.send_message(message_text)
