from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import os  
from google import genai
from google.genai.types import GenerateContentConfig
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Game, Player  
import app.env

client: genai.Client = genai.Client(api_key=app.env.GOOGLE_GEMINI_API_KEY)

chat = client.chats.create(model="gemini-2.0-flash", config=GenerateContentConfig(
    system_instruction=[
        "You are a text generator",
        "Your job is to add to a story every time you receive a story-beat from the user.",
        "Write it in novel format using contemporary English.",
        "Each response should be between 1 and 3 sentences.",
    ]
))

@csrf_exempt
def generate_beat(request, game_id):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        prompt = data.get("text", "")

        if not prompt:
            return JsonResponse({"error": "Missing text input"}, status=400)

        try:
            response = chat.send_message(prompt)
            ai_generated_text = response.text.strip() if hasattr(response, "text") else str(response)

            if not ai_generated_text:
                return JsonResponse({"error": "AI response was empty"}, status=500)

            # ✅ Store only the full updated story
            try:
                game = Game.objects.get(id=game_id)
                game.story += " " + ai_generated_text  # Append new AI-generated text
                game.save()

                # ✅ Send only the full story via WebSocket
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    f"game_{game_id}",
                    {"type": "update_story", "story": game.story}  # Only send the updated full story
                )

                return JsonResponse({"updated_story": game.story})  # Only return the full story

            except Game.DoesNotExist:
                return JsonResponse({"error": "Game not found"}, status=404)

        except Exception as e:
            return JsonResponse({"error": "Google Gemini API call failed", "details": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def create_game(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        nickname = data.get("nickname")  # Get creator's name

        if not nickname:
            return JsonResponse({"error": "Missing nickname"}, status=400)

        # ✅ Create a new game
        game = Game.objects.create(story="")

        # ✅ Add the creator as the first player
        Player.objects.create(game=game, nickname=nickname)

        # ✅ Get updated player list
        players = list(game.players.values_list("nickname", flat=True))

        # ✅ Notify WebSocket about new player
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"game_{game.id}",
            {"type": "update_players", "players": players}
        )

        return JsonResponse({"game_id": str(game.id), "players": players})
    
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def join_game(request):
    """ Allows a player to join an existing game """
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        game_id = data.get("game_id")
        nickname = data.get("nickname")

        try:
            game = Game.objects.get(id=game_id)
            Player.objects.create(game=game, nickname=nickname)

            # ✅ Get updated player list
            players = list(game.players.values_list("nickname", flat=True))

            # ✅ Send WebSocket update for all players
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                f"game_{game_id}",
                {"type": "update_players", "players": players}
            )

            return JsonResponse({"message": "Joined successfully", "players": players})
        except Game.DoesNotExist:
            return JsonResponse({"error": "Invalid game ID"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def get_game(request, game_id):
    """ Retrieves game details including players and the story """
    try:
        game = Game.objects.get(id=game_id)
        players = list(game.players.values_list("nickname", flat=True))
        return JsonResponse({"story": game.story, "players": players})
    except Game.DoesNotExist:
        return JsonResponse({"error": "Game not found"}, status=404)

@csrf_exempt
def update_story(request, game_id):
    """ Updates the story when a player submits new text """
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        new_text = data.get("text", "")

        try:
            game = Game.objects.get(id=game_id)
            game.story += " " + new_text
            game.save()
            return JsonResponse({"message": "Story updated", "story": game.story})
        except Game.DoesNotExist:
            return JsonResponse({"error": "Game not found"}, status=404)

    return JsonResponse({"error": "Invalid request method"}, status=400)