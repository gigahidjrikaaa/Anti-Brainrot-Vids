# recommendations/management/commands/fetch_youtube_videos.py
import os
from django.core.management.base import BaseCommand
from googleapiclient.discovery import build
from recommendations.models import YouTubeVideo

class Command(BaseCommand):
    help = 'Fetch YouTube videos and save to database'

    def handle(self, *args, **kwargs):
        api_key = os.getenv('YOUTUBE_API_KEY')
        print("YT API KEY: " + api_key)
        if not api_key:
            self.stdout.write(self.style.ERROR('YOUTUBE_API_KEY environment variable not set'))
            return

        youtube = build('youtube', 'v3', developerKey=api_key)

        request = youtube.search().list(
            part="snippet",
            maxResults=50,
            q="music",
            type="video"  # Ensure only videos are fetched
        )
        response = request.execute()

        for item in response['items']:
            if 'videoId' in item['id']:
                video_id = item['id']['videoId']
                title = item['snippet']['title']
                description = item['snippet']['description']
                url = f"https://www.youtube.com/watch?v={video_id}"

                YouTubeVideo.objects.update_or_create(
                    video_id=video_id,
                    defaults={'title': title, 'description': description, 'url': url}
                )

        self.stdout.write(self.style.SUCCESS('Successfully fetched and saved YouTube videos'))
