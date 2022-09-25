from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Checkout
from .serializers import CheckoutSerializer


class CheckoutCreate(generics.CreateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]


class CheckoutUpdate(generics.UpdateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]
