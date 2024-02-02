from rest_framework import serializers
from .models import User, Token,UserContacts

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = "__all__"

class UserContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserContacts
        fields = "__all__"