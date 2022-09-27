from django.shortcuts import get_object_or_404
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Checkout, CheckoutLine
from .serializers import CheckoutSerializer, CheckoutLineSerializer
from .utils import (
    validate_line_input,
)


class CheckoutCreate(generics.CreateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]


class CheckoutUpdate(generics.UpdateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]


class CheckoutDetail(generics.RetrieveAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = get_object_or_404(Checkout, user=self.request.user)
        return obj


class CheckoutLineCreate(generics.CreateAPIView):
    serializer_class = CheckoutLineSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        validate_line_input(serializer.validated_data)
        return super().perform_create(serializer)


class CheckoutLineDetail(
    mixins.UpdateModelMixin, 
    mixins.DestroyModelMixin, 
    generics.GenericAPIView):
    queryset = CheckoutLine.objects.all()
    serializer_class = CheckoutLineSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validate_line_input(serializer.validated_data)
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
