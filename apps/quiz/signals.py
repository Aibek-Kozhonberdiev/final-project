# signals.py

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import Room
from .consumers import RoomConsumer

@receiver(post_save, sender=Room)
def room_post_save(sender, instance, **kwargs):
    room_data = {
        "id": instance.id,
        "name": instance.name,
        "status": instance.status,
        # Add other fields you want to include in the update
    }
    RoomConsumer.send_room_update(room_data)

@receiver(post_delete, sender=Room)
def room_post_delete(sender, instance, **kwargs):
    room_data = {
        "id": instance.id,
        "deleted": True
    }
    RoomConsumer.send_room_update(room_data)

