from django.db import models
from user.models import User

# Create your models here.
'''
class Chat(models.Model):
    people = models.ManyToManyField(User, related_name='chats')
    # Using DateTimeField to automatically set this field to now
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Chat {self.id} created at {self.created_at}"
    

class Message(models.Model):
    chat_id = models.IntegerField()
    receiver =models.IntegerField()
    sender = models.IntegerField()
    content = models.CharField(max_length = 100)
    created_at = models.DateTimeField(auto_now_add=True) 
'''