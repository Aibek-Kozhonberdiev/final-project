# Generated by Django 4.2.6 on 2023-10-24 13:10

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='number_of_completed_games',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='profile',
            name='point',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(-150), django.core.validators.MaxValueValidator(1000)]),
        ),
    ]
