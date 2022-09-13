from django.urls import path

from . import views

urlpatterns = [
    path('address/create/', views.AddressCreate.as_view(), name='address'),
    path('profile', views.UserProfile.as_view(), name='profile'),
    path('register/', views.UserRegister.as_view(), name='register')
]