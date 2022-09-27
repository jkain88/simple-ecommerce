from django.shortcuts import get_object_or_404
from rest_framework.exceptions import APIException

from simple_ecommerce.product.models import Product, ProductVariant


def validate_line_input(data):
    """
        Validate if line create/update input has both product and product variant
    """
    product_id = data.get('product', None)
    product_variant_id = data.get('product_variant', None)

    if product_id is not None and product_variant_id is not None:
        raise APIException('Cannot have product and product variant in one line.')


def get_line_amount(line):
    """
        Calculate line amount based on product/variant and quantity
    """
    if line.product is not None:
        return line.product.price * line.quantity
    elif line.product_variant is not None:
        return line.product_variant.price * line.quantity
