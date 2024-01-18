from rest_framework import serializers

from .models import Address


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
