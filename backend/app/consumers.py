import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from channels.layers import get_channel_layer  # 🔥 Fix: Import missing WebSocket channel layer
from .models import Game

from channels.generic.websocket import AsyncWebsocketConsumer
import json

class StoryConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope["url_route"]["kwargs"]["game_id"]
        self.room_group_name = f"game_{self.game_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        if "text" in data:
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "update_story", "story": data["text"]}
            )

    async def update_story(self, event):
        story = event["story"]
        await self.send(text_data=json.dumps({"story": story}))

    async def update_players(self, event):
        players = event["players"]
        await self.send(text_data=json.dumps({"players": players}))  # ✅ Send player list update