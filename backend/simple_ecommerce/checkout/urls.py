from django.urls import path

from . import views

urlpatterns = [
    path('', views.CheckoutDetail.as_view(), name='checkout_detail'),
    path('create/', views.CheckoutCreate.as_view(), name='checkout_create'),
    path('<int:pk>', views.CheckoutUpdate.as_view(), name='checkout_detail'),
    path('line/create/', views.CheckoutLineCreate.as_view(), name='checkout_line_create'),
    path('line/<int:pk>', views.CheckoutLineDetail.as_view(), name='checkout_line_detail')
]