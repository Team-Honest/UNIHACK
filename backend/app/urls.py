"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.urls import path
from . import views  # ✅ Import views correctly

urlpatterns = [
    path("create-game/", views.create_game, name="create_game"),  # ✅ Create game
    path("join-game/", views.join_game, name="join_game"),  # ✅ Join game
    path("game/<str:game_id>/", views.get_game, name="get_game"),  # ✅ Get game details
    path("game/<str:game_id>/generate-story/", views.generate_beat, name="generate_story"),  # ✅ Generate AI story
    path("game/<str:game_id>/update-story/", views.update_story, name="update_story"),  # ✅ Update story
]