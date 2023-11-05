import telebot
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response


class SendMessage:
    def send_message(self, message_text):
        """
        Method for sending a complaint to the admin in telegram
        """
        try:
            bot = telebot.TeleBot(settings.TELEGRAM_KEY)
            bot.send_message(settings.ADMIN_TELEGRAM_ID, message_text)
            return Response({'message': 'The message was successfully sent to Telegram administrator'})
        except Exception as e:
            return Response({'message': 'Error sending message to Telegram: ' + str(e)}, status.HTTP_400_BAD_REQUEST)
