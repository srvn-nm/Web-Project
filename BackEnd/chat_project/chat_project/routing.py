from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('chat/<int:chat_id>/', consumers.ChatConsumer.as_asgi()),
]
