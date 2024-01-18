from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import Address, User


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            "id",
            "is_default",
            "address_type",
            "city_area",
            "city",
            "province",
            "street",
            "postal_code",
            "contact_number",
            "delivery_label",
        ]


class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    checkout = serializers.SerializerMethodField()

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
        ]

    def get_checkout(self, obj):
        from simple_ecommerce.checkout.serializers import CheckoutSerializer

        try:
            checkout = obj.checkout
            print(obj.checkout)
            return CheckoutSerializer(checkout).data
        except ObjectDoesNotExist:
            return {}


class UserRegisterSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["password"]
        extra_kwargs = {
            "password": {
                "write_only": True,
            }
        }
