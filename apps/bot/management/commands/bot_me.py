import telebot
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Initialize the Telegram bot'

    def handle(self, *args, **options):
        try:
            # checking availability of token telegram
            bot = telebot.TeleBot(settings.TELEGRAM_KEY)
            bot_info = bot.get_me()
            bot_data = (
                f'ID: {bot_info.id}\n'
                f'Username: {bot_info.username}\n'
                f'First Name: {bot_info.first_name}\n'
                f'Last Name: {bot_info.last_name}\n'
                f'Language Code: {bot_info.language_code}\n'
                f'Can Join Groups: {bot_info.can_join_groups}\n'
                f'Can Read All Group Messages: {bot_info.can_read_all_group_messages}\n'
                f'Supports Inline Queries: {bot_info.supports_inline_queries}\n'
                f'Is Premium: {bot_info.is_premium}\n'
                f'Added to Attachment Menu: {bot_info.added_to_attachment_menu}'
            )
            print(bot_data)
        except Exception:
            print('Bot token is not defined')

        # checking for the presence of id admin
        if settings.ADMIN_TELEGRAM_ID == None:
            print('No admin ID')
