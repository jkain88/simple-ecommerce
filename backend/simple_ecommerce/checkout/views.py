from django.conf import settings
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from djmoney.money import Money
from rest_framework import generics, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Checkout, CheckoutLine
from .serializers import (
    CheckoutSerializer,
    CheckoutCompleteSerializer,
    CheckoutLineSerializer,
    CheckoutLineMultipleDeleteSerializer,
    CheckoutPaymentCreateSerializer,
)
from simple_ecommerce.core.models import Address
from simple_ecommerce.core.serializers import AddressSerializer
from simple_ecommerce.order.models import Order, OrderLine
from simple_ecommerce.order.serializers import OrderSerializer
from simple_ecommerce.payment.choices import PaymentStatus
from simple_ecommerce.payment.models import Payment
from simple_ecommerce.payment.serializers import PaymentSerializer


class CheckoutCreate(generics.CreateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer_class()
        try:
            checkout = user.checkout
            return Response(serializer(checkout).data)
        except ObjectDoesNotExist:
            checkout = Checkout.objects.create(user=user)
            default_address = user.addresses.filter(is_default=True)

            if default_address.exists():
                checkout.shipping_address = default_address.first()
                checkout.save()

            return Response(serializer(checkout).data)


class CheckoutUpdate(generics.UpdateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]


class CheckoutDetail(generics.RetrieveAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        try:
            checkout = user.checkout
        except ObjectDoesNotExist:
            checkout, _ = Checkout.objects.get_or_create(user=user)

        default_address = user.addresses.filter(is_default=True)
        if default_address.exists() and checkout.shipping_address is None:
            checkout.shipping_address = default_address.first()
            checkout.save()

        return checkout


class CheckoutLineCreate(generics.CreateAPIView):
    serializer_class = CheckoutLineSerializer
    permission_classes = [IsAuthenticated]


class CheckoutLineDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CheckoutLine.objects.all()
    serializer_class = CheckoutLineSerializer
    permission_classes = [IsAuthenticated]


class CheckoutLineMultipleDelete(generics.GenericAPIView):
    serializer_class = CheckoutLineMultipleDeleteSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        # Validate checkout line if exists in checkout
        for line in validated_data["lines"]:
            if line not in validated_data["checkout"].lines.all():
                return Response(
                    {"detail": "Invalid checkout line"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        for line in validated_data["lines"]:
            line.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CheckoutPaymentCreate(generics.GenericAPIView):
    serializer_class = CheckoutPaymentCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        checkout = get_object_or_404(Checkout, id=data["checkout"])

        amount = Money(checkout.total_amount, settings.DEFAULT_CURRENCY)
        payment, _ = Payment.objects.update_or_create(
            checkout=checkout,
            defaults={
                "gateway": data["gateway"],
                "amount": amount,
                "status": PaymentStatus.FULLY_CHARGED,
                "customer": checkout.user,
            },
        )
        return Response(PaymentSerializer(payment).data)


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
        if checkout.shipping_address is None:
            return Response(
                {"error": "Add shipping address in order to proceed"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        with transaction.atomic():
            order = Order.objects.create(
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

            payment = checkout.payment
            payment.order = order
            payment.save()

            checkout.delete()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class CheckoutAddressUpdate(generics.UpdateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        checkout = self.request.user.checkout
        address = self.request.user.checkout.shipping_address

        # Creates a blank temporary address if address is not set before this
        if address is None:
            address = Address.objects.create()
            checkout.shipping_address = address
            checkout.save()
            return address

        return self.request.user.checkout.shipping_address
