from django.db import transaction
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Checkout, CheckoutLine
from .serializers import (
    CheckoutSerializer,
    CheckoutCompleteSerializer,
    CheckoutLineSerializer,
)
from .utils import (
    validate_line_input,
)
from simple_ecommerce.order.models import Order, OrderLine
from simple_ecommerce.order.serializers import OrderSerializer


class CheckoutCreate(generics.CreateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        try:
            checkout = user.checkout
            serializer = self.get_serializer(checkout)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            pass

        serializer.save(user=user)


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
    mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView
):
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


class CheckoutComplete(generics.GenericAPIView):
    """
    Create order, order line and delete checkout
    """

    serializer_class = CheckoutCompleteSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        checkout = get_object_or_404(Checkout, pk=validated_data["checkout"])
        with transaction.atomic():
            order = Order.objects.create(
                billing_address=checkout.billing_address,
                shipping_address=checkout.shipping_address,
                total_amount=checkout.total_amount,
                user=checkout.user,
            )
            for checkout_line in checkout.lines.all():
                OrderLine.objects.create(
                    amount=checkout_line.amount,
                    order=order,
                    product=checkout_line.product,
                    product_variant=checkout_line.product_variant,
                    quantity=checkout_line.quantity,
                )
            checkout.delete()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
