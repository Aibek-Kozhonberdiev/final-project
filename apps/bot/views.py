from django.contrib.auth.models import User
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView

from .bot_main import send_message


class ComplaintMessage(APIView):
    def get_object(self, pk):
        return get_object_or_404(User, pk=pk)

    @swagger_auto_schema(
        operation_description='To send a complaint against a user via Telegram',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'text': openapi.Schema(type=openapi.TYPE_STRING),
            }
        )

    )
    def post(self, request, pk):
        text = request.data.get('text')
        user = self.get_object(pk)
        message_text = f"Жалоба на пользователя: {user.username}\n{text}"

        return send_message(message_text)
