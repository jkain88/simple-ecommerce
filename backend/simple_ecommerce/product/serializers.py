from djmoney.contrib.django_rest_framework import MoneyField
from rest_framework import serializers

from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id', 
            'name', 
            'description'
        ]


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', allow_null=True)
    price = MoneyField(max_digits=9, decimal_places=2)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'category',
            'category_name',
            'price',
            'price_currency',
            'sku'
        ]
