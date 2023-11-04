# Generated by Django 4.1.12 on 2023-11-04 08:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_profile_confirmed'),
    ]

    operations = [
        migrations.CreateModel(
            name='KeyConfirmation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=10)),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='user.profile')),
            ],
        ),
    ]
