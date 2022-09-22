from rest_framework import serializers

from .models import (
    Checkout,
    CheckoutLine
)
from simple_ecommerce.user.serializers import (
    AddressSerializer, 
    UserSerializer
)
from simple_ecommerce.product.serializers import (
    ProductSerializer,
    ProductVariantSerializer
)

class CheckoutSerializer(serializers.ModelSerializer):
    billing_address = AddressSerializer()
    shipping_address = AddressSerializer()
    user = UserSerializer()

    class Meta:
        model = Checkout
        fields = [
            'id',
            'billing_address',
            'shipping_address',
            'status',
            'total_amount'
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