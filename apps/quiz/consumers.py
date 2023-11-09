import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

from .models import Room
from .serializers import RoomSerializer

class RoomConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'room'
        self.user_id = self.scope['user'].id  # Assuming you have user information in the scope

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def get_rooms_as_json(self):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return json.dumps(serializer.data)

    # @receiver(m2m_changed, sender=Room.members.through)
    def receive(self, text_data):
        rooms_json = self.get_rooms_as_json()
        self.send(text_data=rooms_json)

    # @receiver(m2m_changed, sender=Room.members.through)
    # def send_update_to_clients(sender, **kwargs):
    #     content = kwargs.get('content', None)
    #     if content:
    #         group_name = 'room'  # Имя группы
    #         user_id = content.user_id  # Assuming you have the user_id in the 'content'
    #         async_to_sync(sender.channel_layer.send)(
    #             f"user_{user_id}",  # Send to a specific user's channel
    #             {
    #                 'type': 'update_content',
    #                 'content': content,
    #             }
    #         )

    def update_content(self, event):
        rooms_json = self.get_rooms_as_json()
        content = event['content']
        self.send(text_data=rooms_json)
