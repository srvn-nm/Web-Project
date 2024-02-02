from rest_framework import serializers
from .models import MeGroupMessages,Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"

class GroupMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeGroupMessages
        fields = "__all__"