from django.http import request
from django.shortcuts import render

def bruh(request):
  return render(request, 'index.html')