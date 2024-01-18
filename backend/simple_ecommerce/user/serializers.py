from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import User
from simple_ecommerce.core.serializers import AddressSerializer


class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "addresses",
            "age",
            "birthday",
            "contact_number",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "sex",
        ]


class UserRegisterSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["password"]
        extra_kwargs = {
            "password": {
                "write_only": True,
            }
        }
