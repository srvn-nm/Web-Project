import time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import User, Token, UserContacts
from .serializers import UserSerializer,TokenSerializer, UserContactsSerializer
from Crypto.Cipher import AES
import base64

def padding_function(text):
    padding = AES.block_size - (len(text) % AES.block_size)
    return text + bytes([padding] * padding)

def encrypt(plaintext):

    key = padding_function(bytes("11273876132871563675428757125", 'utf-8'))
    cipher = AES.new(key, AES.MODE_ECB)
    padded_text = padding_function(plaintext.encode('utf-8'))
    ciphered_text = cipher.encrypt(padded_text)
    encrypted_text = base64.b64encode(ciphered_text).decode()

    return encrypted_text

def token_validator(token):
        try:
            queryset = Token.objects.get(content = token)
           
            if  queryset.expired_time > int(time.time() / 60):
                return True 
            else:
                return False 
        except Token.DoesNotExist:
            False

class SignupView(APIView):
    def post(self, request):
      if len(request.data.get('password')) > 8:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            encrypted_password = encrypt(request.data.get('password'))
            user.password = encrypted_password
            user.save()

            username = request.data.get('username')
            encrypted_token = encrypt(encrypted_password + username)
            token = {
                "content":encrypted_token,
                "expired_time":  int(time.time() / 60) + 240
            }
            ser2 = TokenSerializer(data=token)
            if ser2.is_valid():
                ser2.save()
                return Response(token, status=status.HTTP_201_CREATED)
            else:
                print(ser2.errors)
                return Response({"message":f"{ser2.errors}"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      else: 
          return Response({"message":"len of password is not enough"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class LoginView(APIView):

    def is_exist(self , username,password):
        try:
            queryset = User.objects.get(username = username , password = password)
            return queryset
        except User.DoesNotExist:
            pass

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        password = encrypt(password)
        user = self.is_exist(username,password)
        if user :
            encrypted_token = encrypt(password + username)
            token = {
                "content":encrypted_token,
                "expired_time":  int(time.time() / 60) + 240
            }
            ser =TokenSerializer(data=token)
            if ser.is_valid():
                ser.save()
                return Response(token,status=status.HTTP_200_OK)
            else:
                print(ser.errors)
                return Response({"message":f"{ser.errors}"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"message":"no user with this username/password ..."},status=status.HTTP_401_UNAUTHORIZED)
    
    def get(self,request):
        return Response({"message":"NOT FOUND"},status=status.HTTP_404_NOT_FOUND)

class UserView(APIView):     
    def is_exist(self , username):
        try:
            queryset = User.objects.get(username = username)
            return queryset
        except User.DoesNotExist:
            pass

    def get(self, request,user_id):
        
       
        user = self.is_exist(user_id)
        if user :
            token = request.headers.get('token')
           
            is_valid  = token_validator(token=str(token))
            if is_valid :
                    user_data = UserSerializer(user).data
                    return Response(user_data, status=status.HTTP_200_OK)
            else:
                    return Response({"message":f"not authorized, token is invalid or expired"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message":"no user with this username ..."},status=status.HTTP_404_NOT_FOUND)
        
    def patch(self, request,user_id):
        user = self.is_exist(user_id)
        if user :
            token = request.headers.get('token')
            
           
            is_valid  = token_validator(token=str(token))
            if is_valid :
                    serializer = UserSerializer(user, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message":"no user with this username ..."},status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, user_id):
            user = self.is_exist(user_id)
            if user :
                token = request.headers.get('token')
                is_valid  = token_validator(token=str(token))
                if is_valid :
                        user.delete()
                        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({"message":f"not authorized, token is invalid or expired"},status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"message":"no user with this username ..."},status=status.HTTP_404_NOT_FOUND)
           
class UserSearchView(APIView):     
    def get(self, request):
        keyword = request.query_params.get('keyword', '')

        try:
        # Filter users based on the keyword
            users = User.objects.filter(
                Q(username__icontains=keyword) |
                Q(firstname__icontains=keyword) |
                Q(lastname__icontains=keyword)
            )
        
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"message":"no user with this info ..."}, status=status.HTTP_404_NOT_FOUND)
         
class UserContactsView(APIView):   
    def is_exist(self , username):
        try:
            queryset = User.objects.get(username = username)
            return queryset
        except User.DoesNotExist:
            pass

    def is_contact_exist(self , username):
        try:
            queryset = UserContacts.objects.all()
            contacts = []
            for item in queryset:
                if item.user_id == username:
                    contacts.append(item)
            if len(contacts) != 0:
                return contacts
            else :
                pass
        except UserContacts.DoesNotExist:
            pass

    def get(self, request,user_id):
        
        user = self.is_exist(user_id)
        if user :
            token = request.headers.get('token')
            is_valid  = token_validator(token=str(token))
            if is_valid:
                userContacts = self.is_contact_exist( user_id)
                if userContacts:
                    serializer = UserContactsSerializer(userContacts, many=True)
                    
                    return Response(serializer.data, status=status.HTTP_200_OK)
                    
                else:
                     return Response({"message":"no contact for this user with this username ..."},status=status.HTTP_404_NOT_FOUND)
            else:
                    return Response({"message":f"not authorized, token is invalid or expired"},status=status.HTTP_401_UNAUTHORIZED)
        else:
             return Response({"message":"no user with this username ..."},status=status.HTTP_404_NOT_FOUND)

    def post(self, request, user_id):
        user = self.is_exist(user_id) 
        if user:
            token = request.headers.get('token')
            is_valid = token_validator(token=str(token))
            if is_valid:
                contact_data = request.data
                contact_data['user_id'] = user_id
                serializer = UserContactsSerializer(data=contact_data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Not authorized, token is invalid or expired"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message": "No user with this username"}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, user_id, contact_id):
        user = self.is_exist(user_id)
        if user:
            token = request.headers.get('token')
            is_valid = token_validator(token=str(token))
            if is_valid:
                try:
                    contact = UserContacts.objects.get(contact_id=contact_id, user_id=user_id)
                    contact.delete()
                    return Response({"message": "Contact deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
                except UserContacts.DoesNotExist:
                    return Response({"message": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"message": "Not authorized, token is invalid or expired"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message": "No user with this username"}, status=status.HTTP_404_NOT_FOUND)