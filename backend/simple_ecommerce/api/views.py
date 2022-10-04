from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPair(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer