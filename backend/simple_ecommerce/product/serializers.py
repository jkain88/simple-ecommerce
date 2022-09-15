from djmoney.contrib.django_rest_framework import MoneyField
from rest_framework import serializers

from .models import Category, Product, ProductVariant


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id', 
            'name', 
            'description'
        ]


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = [
            'id',
            'name',
            'product',
            'price',
            'sku'
        ]


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', allow_null=True)
    price = MoneyField(max_digits=9, decimal_places=2)
    variants = ProductVariantSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'category',
            'category_name',
            'price',
            'price_currency',
            'sku',
            'variants'
        ]
