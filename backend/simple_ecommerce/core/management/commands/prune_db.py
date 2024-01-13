from django.core.management.base import BaseCommand

from simple_ecommerce.product.models import (
    Category,
    Product,
    ProductVariant,
    ProductImage,
)
from simple_ecommerce.user.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        Product.objects.all().delete()
        ProductImage.objects.all().delete()
        Category.objects.all().delete()
