from django.urls import path

from . import views

urlpatterns = [
    path('', views.OrderList.as_view(), name='order_list'),
    path('<int:pk>', views.OrderDetail.as_view(), name='order_detail'),
   # path('user/<int:pk>')
]