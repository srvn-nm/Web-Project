from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
from chat.models import Chat, Message 
from User.models import  User


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group_name = f'chat_{self.chat_id}'

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.save_message(message)

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

    # Receive message from chat group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
        }))

    @database_sync_to_async
    def save_message(self, message):
        chat = Chat.objects.get(pk=self.chat_id)
        sender_username = message.get('sender')
        receiver_username = message.get('receiver')
        content = message.get('content')

        sender = User.objects.get(username=sender_username)
        receiver = User.objects.get(username=receiver_username)

        Message.objects.create(chat=chat, sender=sender.username, receiver=receiver.username, content=content)
