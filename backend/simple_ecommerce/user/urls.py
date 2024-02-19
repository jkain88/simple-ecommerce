from django.urls import path

from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name="user_list"),
    path("login/", views.Login.as_view(), name="user_login"),
    path("staff/login/", views.StaffLogin.as_view(), name="staff_login"),
    path("logout/", views.Logout.as_view(), name="user_logout"),
    path("addresses", views.AddressList.as_view(), name="user_addresses"),
    path("addresses/<int:pk>", views.AddressDetail.as_view(), name="user_addresses"),
    path(
        "addresses/create/", views.AddressCreate.as_view(), name="user_address_create"
    ),
    path("profile", views.UserProfile.as_view(), name="user_profile"),
    path("register/", views.UserRegister.as_view(), name="user_register"),
]
