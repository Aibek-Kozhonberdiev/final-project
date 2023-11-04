import telebot
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Initialize the Telegram bot'

    def handle(self, *args, **options):
        try:
            # checking availability of token telegram
            bot = telebot.TeleBot(settings.TELEGRAM_KEY)
            print(bot.get_me())
        except Exception:
            print('Bot token is not defined')

        # checking for the presence of id admin
        if settings.ADMIN_TELEGRAM_ID == None:
            print('No admin ID')
