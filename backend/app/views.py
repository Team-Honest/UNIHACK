from django.http import request, JsonResponse
from django.shortcuts import render
from django.conf import settings

import json

import google.generativeai as genai

import app.env

genai.configure(api_key=app.env.GOOGLE_GEMINI_API_KEY)
model = genai.GenerativeModel(
    "models/gemini-2.0-flash",
    system_instruction="You are a text generator; your job is to add to a story every time you recieve a story-beat from the user. Never response as an assistant, always add to the story according to the user's input. Write it in novel format using contemporary english. Each response should be between 1 and 3 sentences.",
)

chat = model.start_chat()

def generate_story(request):
  if request.method == 'POST':
    return JsonResponse({"response": "BRUH!"})
  else:
    return JsonResponse({'error':"Invalid request method. Please send a POST request."}, status=400)