# Generated by Django 4.2.6 on 2023-10-26 16:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0004_alter_quiz_options_question_time_alter_question_quiz_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='update',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 26, 22, 28, 21, 578667)),
        ),
    ]
