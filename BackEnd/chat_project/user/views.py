import time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User, Token
from .serializers import UserSerializer,TokenSerializer
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import base64

def padding_function(text):
    padding = AES.block_size - (len(text) % AES.block_size)
    return text + bytes([padding] * padding)

def encrypt(plaintext):

    key = "11273876132871563675428757125"
    cipher = AES.new(key, AES.MODE_ECB)

    padded_text = padding_function(plaintext.encode('utf-8'))
    ciphered_text = cipher.encrypt(padded_text)
    encrypted_text = base64.b64encode(ciphered_text).decode()

    return encrypted_text

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        user = self.is_exist(username,password)
        if user :

            password = encrypt(password)
            encrypted_token = encrypt(password + username)
            token = {
                "content":encrypted_token,
                "expired_time":  int(time.time() / 60) + 240
            }
            ser =TokenSerializer(data=token)
            if ser.is_valid():
                ser.save()
                response = {
                    "user": user,
                    "token":token
                }
                return Response(response,status=status.HTTP_200_OK)
            else:
                print(ser.errors)
                return Response({"message":f"{ser.errors}"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"message":"no user with this username/password ..."},status=status.HTTP_401_UNAUTHORIZED)
        