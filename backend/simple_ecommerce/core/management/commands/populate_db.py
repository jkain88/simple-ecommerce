from decimal import Decimal
import os
import random
import requests

from django.core.files import File
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from django.conf import settings

from simple_ecommerce.product.models import (
    Brand,
    Category,
    Product,
    ProductVariant,
    ProductImage,
)
from simple_ecommerce.core.models import Address
from simple_ecommerce.user.models import User


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
        print("PRODUCT", product)
        price = Decimal(product["Price"].replace("Php ", "").replace(",", ""))
        name = " ".join(product["Name"].split(" ")[:5])
        is_featured = random.choice([True, False])
        brand, _ = Brand.objects.get_or_create(name=product["Brand"])
        if not Product.objects.filter(name=name).exists() and product["ImageList"]:
            try:
                thumbnail_data = requests.get(product["ImageList"][0]).content
                thumbnail_name = "-".join(name.split(" ")).lower() + f"-thumbnail.webp"
                thumbnail_path = f"{settings.BASE_DIR}/images/products/{thumbnail_name}"

                if not os.path.exists(thumbnail_path):
                    os.makedirs(os.path.dirname(thumbnail_path), exist_ok=True)
                    with open(
                        thumbnail_path,
                        "wb",
                    ) as handler:
                        handler.write(thumbnail_data)

                with open(thumbnail_path, "rb") as f:
                    db_product = Product.objects.create(
                        name=name,
                        price=price,
                        thumbnail=File(f, name=thumbnail_name),
                        sku=product["ConfigSku"],
                        quantity=1000,
                        is_featured=is_featured,
                        has_variants=False,
                        category=category,
                        brand=brand,
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    )
                    ProductVariant.objects.create(
                        name=name,
                        price=price,
                        sku=product["ConfigSku"],
                        product=db_product,
                        thumbnail=File(f, name=thumbnail_name),
                    )
                # Create product image
                for index, image_url in enumerate(product["ImageList"]):
                    image_data = requests.get(image_url).content
                    image_name = "-".join(name.split(" ")).lower() + f"-{index}.webp"
                    print(image_name)
                    image_path = (
                        f"/app/simple_ecommerce/static/images/products/{image_name}"
                    )

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

            except IntegrityError:
                continue


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

        admin, _ = User.objects.get_or_create(
            email="admin@gmail.com",
            is_staff=True,
            is_superuser=True,
            first_name="Admin",
            last_name="Admin",
            contact_number="+63999999999",
        )
        admin.set_password("admin")
        admin.save()

        Address.objects.get_or_create(
            user=admin,
            defaults={
                "is_default": True,
                "city_area": "Manila",
                "city": "Manila",
                "postal_code": "1000",
                "province": "Metro Manila",
                "street": "Tondo",
                "contact_number": "+639999999999",
            },
        )

        Address.objects.get_or_create(
            user=admin,
            defaults={
                "is_default": False,
                "city_area": "Matahimik",
                "city": "Cainta",
                "postal_code": "1000",
                "province": "Metro Manila",
                "street": "Tondo",
                "contact_number": "+639999999999",
            },
        )
        self.stdout.write(self.style.SUCCESS("Database populated!"))
