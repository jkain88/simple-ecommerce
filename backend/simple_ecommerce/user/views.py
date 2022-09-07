from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (
    Address, 
    User
)
from .serializers import (
    AddressSerializer,
    UserSerializer,
    UserRegisterSerializer
)


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    model = User

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        User.objects.create_user(**data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    model = User
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class AddressView(generics.CreateAPIView):
    serializer_class = AddressSerializer
    model = Address
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        Address.objects.update_or_create(
            address_type=data['address_type'],
            user=data['user'],
            defaults={**data}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
