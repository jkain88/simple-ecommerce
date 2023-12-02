import os
from django.core.files import File
from django.core.management.base import BaseCommand

from simple_ecommerce.product.models import Category, Product, ProductVariant, ProductImage


# Get the directory of the current script
script_dir = os.path.dirname(__file__)

# Construct the path to the image file

def populate_categories():
    categories = [
        {
            "name": "Men Clothes"
        },
        {
            "name": "Women Clothes"
        },
        {
            "name": "Sports"
        },
        {
            "name": "Electronics"
        },
    ]

    for category in categories:
        print(f"Creating {category['name']} category")
        Category.objects.get_or_create(**category)


def populate_products():
    products = [
        {
            "name": "MANGO Man",
            "category": Category.objects.get(name="Men Clothes"),

        }
    ]

    for product in products:
        print(f"Creating {product['name']} product")
        Product.objects.get_or_create(**product)

    product_images = [
        {
            "image_path": "/app/simple_ecommerce/static/images/products/mango-man-1.webp",
            "product": Product.objects.get(name="MANGO Man"),
            "alt": "MANGO Man"
        },
        {
            "image_path": "/app/simple_ecommerce/static/images/products/mango-man-2.webp",
            "product": Product.objects.get(name="MANGO Man"),
            "alt": "MANGO Man"
        },
        {
            "image_path": "/app/simple_ecommerce/static/images/products/mango-man-3.webp",
            "product": Product.objects.get(name="MANGO Man"),
            "alt": "MANGO Man"
        },
    ]

    print(script_dir)
    for product_image in product_images:
        path = product_image.pop("image_path")
        with open(path, "rb") as f:
            image_name = path.split("/")[-1]
            product_image["image"] = File(f, name=image_name)
            print(f"Creating {image_name} product image")
            ProductImage.objects.get_or_create(**product_image)

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write('Populating database...')

        populate_categories()
        populate_products()

        self.stdout.write(self.style.SUCCESS('Database populated!'))