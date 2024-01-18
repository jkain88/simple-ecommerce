from django.shortcuts import get_object_or_404
from rest_framework.exceptions import APIException

from simple_ecommerce.product.models import Product, ProductVariant




def get_line_amount(line):
    """
        Calculate line amount based on product/variant and quantity
    """
    if line.product is not None:
        return line.product.price * line.quantity
    elif line.product_variant is not None:
        return line.product_variant.price * line.quantity
