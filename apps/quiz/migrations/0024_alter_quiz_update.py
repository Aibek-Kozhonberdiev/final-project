# Generated by Django 4.1.12 on 2023-11-06 00:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0023_alter_quiz_update'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='update',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 6, 6, 47, 44, 14040)),
        ),
    ]