import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from channels.layers import get_channel_layer  # 🔥 Fix: Import missing WebSocket channel layer
from .models import Game

from channels.generic.websocket import AsyncWebsocketConsumer
import json

class StoryConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """ A new player connects to the game """
        self.game_id = self.scope["url_route"]["kwargs"]["game_id"]
        self.room_group_name = f"game_{self.game_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # ✅ Fetch all players in the game
        game = await sync_to_async(Game.objects.get)(id=self.game_id)
        players = await sync_to_async(lambda: list(game.players.values_list("nickname", flat=True)))()

        # ✅ Broadcast updated player list to all users in the game
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "update_players",
                "players": players
            }
        )


    async def disconnect(self, close_code):
        """ A player disconnects from the game """
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        # ✅ Remove player from the game database
        game = await sync_to_async(Game.objects.get)(id=self.game_id)
        await sync_to_async(game.players.remove)(self.scope["user"])  # Assuming players are linked to User model

        # ✅ Fetch the updated player list
        players = await sync_to_async(lambda: list(game.players.values_list("nickname", flat=True)))()

        # ✅ Broadcast updated player list to all users
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "update_players",
                "players": players
            }
        )

    async def receive(self, text_data):
        data = json.loads(text_data)

        if "text" in data and "name" in data:  # ✅ Ensures it's a user message
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "update_message",
                    "text": data["text"],
                    "name": data["name"],
                    "sender": "user",
                },
            )    


    async def update_story(self, event):
        story = event["story"]
        await self.send(text_data=json.dumps({"story": story}))

    async def update_players(self, event):
        players = event["players"]
        await self.send(text_data=json.dumps({"players": players}))  # ✅ Send player list update

    async def update_message(self, event):
        """ Sends user message updates to all connected clients """
        await self.send(text_data=json.dumps(event))