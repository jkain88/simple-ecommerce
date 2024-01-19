from rest_framework import serializers

from .models import Checkout, CheckoutLine
from simple_ecommerce.core.serializers import (
    AddressSerializer,
)
from simple_ecommerce.product.serializers import (
    ProductSerializer,
    ProductVariantSerializer,
)


class CheckoutLineSerializer(serializers.ModelSerializer):
    product_variant_detail = ProductVariantSerializer(
        read_only=True, source="product_variant"
    )

    class Meta:
        model = CheckoutLine
        fields = [
            "id",
            "amount",
            "checkout",
            "product_variant",
            "product_variant_detail",
            "quantity",
        ]
        read_only_fields = ["amount"]


class CheckoutSerializer(serializers.ModelSerializer):
    shipping_address_detail = AddressSerializer(
        read_only=True, source="shipping_address"
    )
    lines = CheckoutLineSerializer(many=True, read_only=True)

    class Meta:
        model = Checkout
        fields = [
            "id",
            "lines",
            "shipping_address",
            "shipping_address_detail",
            "total_amount",
            "user",
        ]


class CheckoutCompleteSerializer(serializers.Serializer):
    checkout = serializers.IntegerField()


class CheckoutLineMultipleDeleteSerializer(serializers.Serializer):
    checkout = serializers.PrimaryKeyRelatedField(queryset=Checkout.objects.all())
    lines = serializers.ListField(
        child=serializers.PrimaryKeyRelatedField(queryset=CheckoutLine.objects.all())
    )
