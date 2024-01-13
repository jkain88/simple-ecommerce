from django.urls import path

from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name="user_list"),
    path("login/", views.CustomLogin.as_view(), name="user_login"),
    path("address/create/", views.AddressCreate.as_view(), name="user_address_create"),
    path("profile", views.UserProfile.as_view(), name="user_profile"),
    path("register/", views.UserRegister.as_view(), name="user_register"),
]
