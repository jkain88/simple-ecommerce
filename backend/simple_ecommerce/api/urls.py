from django.urls import path, include

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('user/', include('simple_ecommerce.user.urls'))
]