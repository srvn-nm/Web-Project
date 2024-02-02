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

# Delete a specific chat by ID
class DeleteChatView(APIView):
    def delete(self, request, chat_id):
        chat = get_object_or_404(Chat, pk=chat_id)
        chat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Delete a specific message in a chat
class DeleteMessageView(APIView):
    def delete(self, request, chat_id, message_id):
        message = get_object_or_404(Message, chat_id=chat_id, pk=message_id)
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Similar views would be created for Group endpoints (CreateGroupView, DeleteGroupView, UpdateGroupView, RemoveUserFromGroupView)
