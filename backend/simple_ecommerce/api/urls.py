from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import CustomTokenObtainPair

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('checkout/', include('simple_ecommerce.checkout.urls')),
    path('orders/', include('simple_ecommerce.order.urls')),
    path('products/', include('simple_ecommerce.product.urls')),
    path('users/', include('simple_ecommerce.user.urls')),
    path('token/', CustomTokenObtainPair.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]