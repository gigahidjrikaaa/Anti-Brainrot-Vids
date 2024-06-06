# recommendations/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('recommend/', views.recommend_videos, name='recommend_videos'),
    path('', views.index, name='index'),
    path('accounts/login/', views.login_view, name='login'),
]
