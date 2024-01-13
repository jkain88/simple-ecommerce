from rest_framework import serializers

from .models import Address, User


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            "id",
            "address_type",
            "city_area",
            "city",
            "province",
            "street",
            "postal_code",
            "user",
        ]
        extra_kwargs = {"user": {"write_only": True}}


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
