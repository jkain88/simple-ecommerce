from django.urls import path

from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name="user_list"),
    path("login/", views.Login.as_view(), name="user_login"),
    path("logout/", views.Logout.as_view(), name="user_logout"),
    path("address/create/", views.AddressCreate.as_view(), name="user_address_create"),
    path("profile", views.UserProfile.as_view(), name="user_profile"),
    path("register/", views.UserRegister.as_view(), name="user_register"),
]
