# Generated by Django 4.2.6 on 2023-10-25 23:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_profile_phone_number_alter_profile_bibliography'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='phone_number',
        ),
    ]
