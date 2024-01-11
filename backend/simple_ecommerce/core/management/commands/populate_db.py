from decimal import Decimal
import os
import random
import requests

from django.core.files import File
from django.core.management.base import BaseCommand

from simple_ecommerce.product.models import (
    Category,
    Product,
    ProductVariant,
    ProductImage,
)


# Get the directory of the current script
script_dir = os.path.dirname(__file__)


def create_zalora_products(category_name):
    zalora_category = {
        "Men Clothes": {"id": "96", "segment": "men"},
        "Women Clothes": {"id": "106", "segment": "women"},
        "Sports": {"id": "177", "segment": "men"},
        "Electronics": {"id": "11031", "segment": "home"},
    }
    API_URL = f"https://api.zalora.com.ph/v1/dynproducts/datajet/list?abtest=djAbTest_True%7Cuuid%3A82838788-cd7c-49bb-8ead-c316db09e955&categoryId={zalora_category[category_name]['id']}&fullFacetCategory=true&image_format=webp&image_quality=70&limit=20&offset=0&segment={zalora_category[category_name]['segment']}&shop=m"
    headers = {
        "Accept": "application/json",
    }

    response = requests.get(API_URL, headers=headers).json()
    products = response["data"]["Products"]
    category = Category.objects.get(name=category_name)

    for product in products:
        price = Decimal(product["Price"].replace("Php ", "").replace(",", ""))
        name = " ".join(product["Name"].split(" ")[:5])
        is_featured = random.choice([True, False])
        db_product, _ = Product.objects.get_or_create(
            name=name,
            price=price,
            sku=product["ConfigSku"],
            quantity=1000,
            is_featured=is_featured,
            category=category,
        )

        # Create product image
        for index, image_url in enumerate(product["ImageList"]):
            image_data = requests.get(image_url).content
            image_name = "-".join(name.split(" ")).lower() + f"-{index}.webp"
            print(image_name)
            image_path = f"/app/simple_ecommerce/static/images/products/{image_name}"

            if not os.path.exists(image_path):
                os.makedirs(os.path.dirname(image_path), exist_ok=True)
                with open(
                    image_path,
                    "wb",
                ) as handler:
                    handler.write(image_data)

            product_image = {"alt": name, "product": db_product}
            with open(image_path, "rb") as f:
                product_image["image"] = File(f, name=image_name)
                print(f"Creating {image_name} product image")
                ProductImage.objects.get_or_create(**product_image)


def populate_categories():
    categories = [
        {"name": "Men Clothes"},
        {"name": "Women Clothes"},
        {"name": "Sports"},
        {"name": "Electronics"},
    ]

    for category in categories:
        print(f"Creating {category['name']} category")
        Category.objects.get_or_create(**category)


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("Populating database...")

        populate_categories()
        categories = Category.objects.all()
        for category in categories:
            create_zalora_products(category.name)

        self.stdout.write(self.style.SUCCESS("Database populated!"))
