from django.contrib.auth.models import User
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView

from .bot_main import SendMessage


class ComplaintMessage(APIView, SendMessage):
    def get_object(self, pk):
        return get_object_or_404(User, pk=pk)

    def post(self, request, pk):
        text = request.data.get('text')
        user = self.get_object(pk)
        message_text = f"Жалоба на пользователя: {user.username}\n{text}"

        return self.send_message(message_text)
