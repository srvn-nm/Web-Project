from user.models import User
from django.utils import timezone
from django.db import models

# Create your models here.

class Chat(models.Model):
    people = models.ManyToManyField(User, related_name='chats')
    created_at = models.DateTimeField(default=timezone.now)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length = 300)
    receiver = models.CharField(max_length = 300)
    content = models.CharField(max_length = 300)
    created_at = models.DateTimeField(default=timezone.now)
