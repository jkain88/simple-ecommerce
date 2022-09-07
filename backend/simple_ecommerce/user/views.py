from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import (
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


class UserProfile(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    model = User
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# TODO: ADDRESS CREATE