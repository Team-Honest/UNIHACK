from django.db import models
import uuid

class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    story = models.TextField(default="")  # Stores the AI-generated story

class Player(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="players")
    nickname = models.CharField(max_length=100)

    def __str__(self):
        return self.nickname