# Generated by Django 5.0.1 on 2024-02-01 23:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="user_id",
        ),
    ]
