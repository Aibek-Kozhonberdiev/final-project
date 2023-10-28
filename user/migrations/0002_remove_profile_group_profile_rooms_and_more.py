# Generated by Django 4.1.12 on 2023-10-28 06:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quiz', '0003_alter_quiz_update_alter_room_members'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='group',
        ),
        migrations.AddField(
            model_name='profile',
            name='rooms',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='memberships', to='quiz.room'),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='profile',
            name='user',
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
