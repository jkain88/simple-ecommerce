from django.shortcuts import get_object_or_404
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated

from .models import Checkout, CheckoutLine
from .serializers import CheckoutSerializer, CheckoutLineSerializer


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


class CheckoutLineDetail(
    mixins.UpdateModelMixin, 
    mixins.DestroyModelMixin, 
    generics.GenericAPIView):
    queryset = CheckoutLine.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
