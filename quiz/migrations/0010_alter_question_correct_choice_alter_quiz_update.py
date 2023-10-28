# Generated by Django 4.1.12 on 2023-10-28 11:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0009_alter_question_correct_choice_alter_quiz_update'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='correct_choice',
            field=models.IntegerField(choices=[(1, 'Choice A'), (2, 'Choice B'), (3, 'Choice C'), (4, 'Choice D')]),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='update',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 28, 17, 51, 35, 914346)),
        ),
    ]
