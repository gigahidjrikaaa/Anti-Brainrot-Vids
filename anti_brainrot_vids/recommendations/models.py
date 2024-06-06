# recommendations/models.py
from django.db import models
from django.contrib.auth.models import User

class YouTubeVideo(models.Model):
    video_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    url = models.URLField(max_length=200)

    def __str__(self):
        return self.title

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(YouTubeVideo, on_delete=models.CASCADE)
    rating = models.IntegerField()

    class Meta:
        unique_together = ('user', 'video')
