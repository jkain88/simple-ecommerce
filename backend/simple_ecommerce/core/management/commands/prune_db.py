from django.core.management.base import BaseCommand

from simple_ecommerce.product.models import Category, Product, ProductVariant, ProductImage

class Command(BaseCommand):
    def handle(self, *args, **options):
        Product.objects.all().delete()
        ProductImage.objects.all().delete()
        Category.objects.all().delete()