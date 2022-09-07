from django.urls import path

from . import views

urlpatterns = [
    path('profile', views.UserProfile.as_view(), name='profile'),
    path('register/', views.UserRegisterView.as_view(), name='register')
]