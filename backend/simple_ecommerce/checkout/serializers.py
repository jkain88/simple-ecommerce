from rest_framework import serializers

from .models import (
    Checkout,
    CheckoutLine
)
from simple_ecommerce.user.serializers import (
    AddressSerializer, 
)
from simple_ecommerce.product.serializers import (
    ProductSerializer,
    ProductVariantSerializer
)

class CheckoutSerializer(serializers.ModelSerializer):
    billing_address_detail = AddressSerializer(read_only=True, source='billing_address')
    shipping_address_detail = AddressSerializer(read_only=True, source='shipping_address')

    class Meta:
        model = Checkout
        fields = [
            'id',
            'billing_address',
            'billing_address_detail',
            'shipping_address',
            'shipping_address_detail',
            'status',
            'total_amount',
            'user'
        ]


class CheckoutLine(serializers.ModelSerializer):
    product = ProductSerializer()
    product_variant = ProductVariantSerializer()

    class Meta:
        model = CheckoutLine
        fields = [
            'id',
            'amount'
            'checkout',
            'product',
            'product_variant'
            'quantity'
        ]
