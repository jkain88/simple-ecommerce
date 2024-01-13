from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Address, User
from .serializers import AddressSerializer, UserSerializer, UserRegisterSerializer


class Login(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)

        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "id": user.id,
                    "email": user.email,
                    "name": f"{user.first_name} {user.last_name}",
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST
            )


class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class UserRegister(generics.CreateAPIView):
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


class AddressCreate(generics.CreateAPIView):
    serializer_class = AddressSerializer
    model = Address
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        Address.objects.update_or_create(
            address_type=data["address_type"], user=data["user"], defaults={**data}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
