import time
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from user.models import Token

def token_validator(token):
        try:
            queryset = Token.objects.get(content = token)
           
            if  queryset.expired_time > int(time.time() / 60):
                return True 
            else:
                return False 
        except Token.DoesNotExist:
            False

class ChatView(APIView):
    def post(self, request):
        token = request.headers.get('token')
           
        is_valid  = token_validator(token=str(token))
        if is_valid :
            serializer = ChatSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        chats = Chat.objects.all()
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)
        
# Get a specific chat by ID
class ChatDetailView(APIView):
    def get(self, request, chat_id):
        # Fetch the chat to ensure it exists
        get_object_or_404(Chat, pk=chat_id)
        # Fetch messages related to the chat
        messages = Message.objects.filter(chat_id=chat_id)
        # Serialize the messages
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, chat_id):
        
        
        token = request.headers.get('token')
        user = request.headers.get('user')
        is_valid = token_validator(token=str(token))
        if is_valid:
                try:
                    chat = Chat.objects.get(pk=chat_id)
                    is_in_chat = chat.people.filter(pk=user).exists()
                    if is_in_chat:
                        chat.delete()
                        return Response({"message": "Chat is deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
                    else:
                        return Response({"message": "YOU ARE NOT IN THIS CHAT"}, status=status.HTTP_400_BAD_REQUEST)
                except Chat.DoesNotExist:
                    return Response({"message": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"message": "Not authorized, token is invalid or expired"}, status=status.HTTP_401_UNAUTHORIZED)
     
class DeleteMessageView(APIView):
    def delete(self, request, chat_id, message_id):
        message = get_object_or_404(Message, chat_id=chat_id, pk=message_id)
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

