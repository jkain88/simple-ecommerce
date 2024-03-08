from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import User
from simple_ecommerce.checkout.serializers import CheckoutSerializer
from simple_ecommerce.core.serializers import AddressSerializer


class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    checkout = CheckoutSerializer(read_only=True)
    number_of_orders = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "addresses",
            "age",
            "birthday",
            "checkout",
            "contact_number",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "sex",
            "number_of_orders",
            "created",
        ]

    def get_number_of_orders(self, obj):
        return obj.orders.count()


class UserRegisterSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["password"]
        extra_kwargs = {
            "password": {
                "write_only": True,
            }
        }
