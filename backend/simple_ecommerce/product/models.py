from django.conf import settings
from django.db import models
from djmoney.models.fields import MoneyField
from model_utils.models import TimeStampedModel

from simple_ecommerce.core.models import PublishableModel


class Category(PublishableModel, TimeStampedModel):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='children')


class Product(PublishableModel, TimeStampedModel):
    name = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, null=True, related_name='products')
    price = MoneyField(max_digits=9, decimal_places=2, null=True, default_currency=settings.DEFAULT_CURRENCY)
    sku = models.CharField(max_length=255, blank=True)


class ProductVariant(TimeStampedModel):
    name = models.CharField(max_length=150)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    price = MoneyField(max_digits=9, decimal_places=2, null=True, default_currency=settings.DEFAULT_CURRENCY)
    sku = models.CharField(max_length=255, blank=True)