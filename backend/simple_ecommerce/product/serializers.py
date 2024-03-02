from djmoney.contrib.django_rest_framework import MoneyField
from rest_framework import serializers

from .models import Brand, Category, Product, ProductImage, ProductVariant


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name", "slug", "no_of_products"]
        read_only_fields = ["no_of_products", "slug"]


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ["id", "name", "description", "slug", "no_of_products"]
        read_only_fields = ["no_of_products", "slug"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt", "product", "variant"]


class BaseProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "thumbnail"]


class ProductVariantSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True)
    product = BaseProductSerializer(read_only=True)

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
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    price = MoneyField(max_digits=9, decimal_places=2)
    variants = ProductVariantSerializer(many=True)
    images = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "brand",
            "category",
            "description",
            "images",
            "is_featured",
            "is_published",
            "has_variants",
            "price",
            "price_currency",
            "slug",
            "sku",
            "quantity",
            "quantity_allocated",
            "variants",
        ]


class ProductsDeleteSerializer(serializers.Serializer):
    product_ids = serializers.ListField(
        child=serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    )


class CategoriesDeleteSerializer(serializers.Serializer):
    category_ids = serializers.ListField(
        child=serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    )


class BrandsDeleteSerializer(serializers.Serializer):
    brand_ids = serializers.ListField(
        child=serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all())
    )
