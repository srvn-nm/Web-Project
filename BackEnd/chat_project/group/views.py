import time
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Group, MeGroupMessages
from .serializers import GroupSerializer, GroupMessageSerializer
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

class GroupView(APIView):
    def post(self, request):
        token = request.headers.get('token')
           
        is_valid  = token_validator(token=str(token))
        if is_valid :
            serializer = GroupSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        Groups = Group.objects.all()
        serializer = GroupSerializer(Groups, many=True)
        return Response(serializer.data)
        
# Get a specific Group by ID
class GroupDetailView(APIView):
    def get(self, request, group_id):
        # Fetch the Group to ensure it exists
        get_object_or_404(Group, pk=group_id)
        # Fetch messages related to the Group
        messages = MeGroupMessages.objects.filter(group_id=group_id)
        # Serialize the messages
        serializer = GroupMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, group_id):
        
        
        token = request.headers.get('token')
        user = request.headers.get('user')
        is_valid = token_validator(token=str(token))
        if is_valid:
                try:
                    Group = Group.objects.get(pk=group_id)
                    is_in_Group = Group.people.filter(pk=user).exists()
                    if is_in_Group:
                        Group.delete()
                        return Response({"message": "Group is deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
                    else:
                        return Response({"message": "YOU ARE NOT IN THIS Group"}, status=status.HTTP_400_BAD_REQUEST)
                except Group.DoesNotExist:
                    return Response({"message": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"message": "Not authorized, token is invalid or expired"}, status=status.HTTP_401_UNAUTHORIZED)
     
class DeleteMessageView(APIView):
    def delete(self, request, group_id, message_id):
        message = get_object_or_404(MeGroupMessages, group_id=group_id, pk=message_id)
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
