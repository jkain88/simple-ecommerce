from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from simple_ecommerce.user.serializers import UserSerializer



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user'] = UserSerializer(user).data
        return token
