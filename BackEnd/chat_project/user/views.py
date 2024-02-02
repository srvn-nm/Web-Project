import time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Token
from .serializers import UserSerializer,TokenSerializer
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

def token_validator(token,expired_time):
        try:
            queryset = Token.objects.get(content = token)
            if expired_time > int(time.time() / 60):
                return True , True
            else:
                return True , False
        except User.DoesNotExist:
            False , False

class SignupView(APIView):
    def post(self, request):
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

    def get(self, request,username):
        
       
        user = self.is_exist(username)
        if user :
            token = request.data.get('content')
            expired_time = request.data.get('expired_time')
            is_valid , is_expired = token_validator(token=token,expired_time=expired_time)
            if is_valid :
                if not is_expired:
                    return Response(token,status=status.HTTP_200_OK)
                else:
                    return Response({"message":f"not authorized, token is invalid or expired"},status=status.HTTP_401_UNAUTHORIZED)
            else:
                    return Response({"message":f"not authorized, token is invalid or expired"},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message":"no user with this username ..."},status=status.HTTP_404_NOT_FOUND)