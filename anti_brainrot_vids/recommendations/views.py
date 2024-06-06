# recommendations/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from .utils import get_svd_recommendations
from .models import YouTubeVideo

def index(request):
    videos = YouTubeVideo.objects.all()
    return render(request, 'recommendations/index.html', {'videos': videos})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
    else:
        form = AuthenticationForm()
    return render(request, 'recommendations/login.html', {'form': form})


@login_required
def recommend_videos(request):
    user_id = request.user.id
    recommendations = get_svd_recommendations(user_id)
    context = {
        'recommendations': recommendations
    }
    return render(request, 'recommendations/recommend_videos.html', context)
