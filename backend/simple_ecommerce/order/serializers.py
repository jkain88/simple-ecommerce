from rest_framework import serializers

from simple_ecommerce.product.serializers import (
    ProductSerializer,
    ProductVariantSerializer,
)

from .models import Order, OrderLine
from simple_ecommerce.payment.serializers import PaymentSerializer
from simple_ecommerce.user.serializers import AddressSerializer


class OrderLineSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(read_only=True, source="product")
    product_variant_detail = ProductVariantSerializer(
        read_only=True, source="product_variant"
    )

    class Meta:
        model = OrderLine
        fields = [
            "id",
            "amount",
            "product",
            "product_detail",
            "product_variant",
            "product_variant_detail",
            "quantity",
        ]
        read_only_fields = ["amount"]


class OrderSerializer(serializers.ModelSerializer):
    billing_address_detail = AddressSerializer(read_only=True, source="billing_address")
    shipping_address_detail = AddressSerializer(
        read_only=True, source="shipping_address"
    )
    lines = OrderLineSerializer(many=True, read_only=True)
    payment = PaymentSerializer(read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "created",
            "billing_address",
            "billing_address_detail",
            "lines",
            "shipping_address",
            "shipping_address_detail",
            "status",
            "total_amount",
            "user",
            "payment",
            "reference",
            "user_email",
        ]
