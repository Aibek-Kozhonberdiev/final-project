import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

from .models import Room
from .serializers import RoomSerializer

class RoomConsumer(WebsocketConsumer):
    def get_rooms_as_json(self):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return json.dumps(serializer.data)

    def connect(self):
        self.room_group_name = 'room'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def receive(self, text_data):
        rooms_json = self.get_rooms_as_json()
        self.send(text_data=rooms_json)

    def update_content(self, event):
        room = Room.objects.get(pk=event['id'])
        room.status = event['status']
        room.save()

        rooms_json = self.get_rooms_as_json()
        self.send(text_data=rooms_json)
