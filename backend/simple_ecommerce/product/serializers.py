from djmoney.contrib.django_rest_framework import MoneyField
from rest_framework import serializers

from .models import Category, Product, ProductImage, ProductVariant


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description", "slug"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt", "product", "variant"]


class ProductVariantSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True)

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "images",
            "name",
            "product",
            "price",
            "quantity",
            "quantity_allocated",
            "sku",
        ]


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", allow_null=True)
    price = MoneyField(max_digits=9, decimal_places=2)
    variants = ProductVariantSerializer(many=True)
    images = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "category",
            "category_name",
            "images",
            "is_featured",
            "price",
            "price_currency",
            "slug",
            "sku",
            "quantity",
            "quantity_allocated",
            "variants",
        ]
