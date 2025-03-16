from django.urls import re_path
from .consumers import StoryConsumer  # Ensure the import is correct

websocket_urlpatterns = [
    re_path(r"ws/game/(?P<game_id>[\w-]+)/$", StoryConsumer.as_asgi()),  # ✅ Correct WebSocket path
]