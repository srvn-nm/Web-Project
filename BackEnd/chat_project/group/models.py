from django.utils import timezone
from django.db import models
from user.models import User

# Create your models here.

class Group(models.Model):
    people = models.ManyToManyField(User, related_name='groups')
    created_at = models.DateTimeField(default=timezone.now)
    
class MeGroupMessages(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='group')
    sender = models.CharField(max_length = 300)
    content = models.CharField(max_length = 300)
    created_at = models.DateTimeField(default=timezone.now)
