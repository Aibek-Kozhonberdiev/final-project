from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from rest_framework.generics import get_object_or_404


def send_message(text_message, pk):
    user = get_object_or_404(User, pk=pk)

    image_url = f'http://{settings.MY_HOST}/static/quiz/img/QUIZ.png'

    send_mail(
        "QUIZ",
        text_message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
        html_message=f'<img src="{image_url}" alt="QUIZ"><p>{text_message}</p>'
    )
