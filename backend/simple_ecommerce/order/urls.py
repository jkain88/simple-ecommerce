from django.urls import path

from . import views

urlpatterns = [
    path("", views.OrderList.as_view(), name="order_list"),
    path("<str:reference>", views.OrderDetail.as_view(), name="order_detail"),
]
