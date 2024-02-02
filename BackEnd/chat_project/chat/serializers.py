from rest_framework import serializers
from .models import Message,Chat

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"

class GroupMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"