
from django.urls import path
from .views import ChatView , ChatDetailView, DeleteChatView, DeleteMessageView
                    

urlpatterns = [
    path('api/chats', ChatView.as_view(), name='chat'),
    path('api/chats/<int:chat_id>', ChatDetailView.as_view(), name='detail_chat'),
    path('api/chats/<int:chat_id>', DeleteChatView.as_view(), name='delete_chat'),
    path('api/chats/<int:chat_id>/messages/<int:message_id>', DeleteMessageView.as_view(), name='delete_message'),
]