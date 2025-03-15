from django.http import request, JsonResponse
from django.shortcuts import render
from django.conf import settings

import json

from google import genai
from google.genai.types import GenerateContentConfig

import app.env

client: genai.Client = genai.Client(api_key=app.env.GOOGLE_GEMINI_API_KEY)

chat = client.chats.create(model="gemini-2.0-flash", config=GenerateContentConfig(
        system_instruction=[
            "You are a text generator",
            "Your job is to add to a story every time you recieve a story-beat from the user.",
            "Never response as an assistant, always add to the story according to the user's input.",
            "Write it in novel format using contemporary english.",
            "Each response should be between 1 and 3 sentences.",
        ]
    ))

def generate_story(request):
  if request.method == 'POST':
    data = json.loads(request)
    prompt = data.get("prompt", "")
    if not prompt:
      return JsonResponse({'error':"Invalid request method. Please send a POST request."}, status=400)

    return JsonResponse({"response": "BRUH!"})
  else:
    return JsonResponse({'error':"Invalid request method. Please send a POST request."}, status=400)