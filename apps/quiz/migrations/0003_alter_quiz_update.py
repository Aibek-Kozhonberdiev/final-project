# Generated by Django 4.1.12 on 2023-11-09 15:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_alter_quiz_update'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='update',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 9, 21, 54, 55, 533367)),
        ),
    ]