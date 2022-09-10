from django.conf import settings
from django.db import models
from django_prices.models import MoneyField
from model_utils.models import TimeStampedModel

from simple_ecommerce.core.models import PublishableModel


class Category(PublishableModel, TimeStampedModel):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='children')


class Product(PublishableModel, TimeStampedModel):
    name = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, null=True, related_name='products')
    currency = models.CharField(default=settings.DEFAULT_CURRENCY, max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    price_amount = models.DecimalField(max_digits=9, decimal_places=2, null=True)
    price = MoneyField(amount_field='price_amount', currency_field='currency')
    sku = models.CharField(max_length=255, blank=True)


class ProductVariant(TimeStampedModel):
    name = models.CharField(max_length=150)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    currency = models.CharField(default=settings.DEFAULT_CURRENCY, max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    price_amount = models.DecimalField(max_digits=9, decimal_places=2)
    price = MoneyField(amount_field='price_amount', currency_field='currency')
    sku = models.CharField(max_length=255, blank=True)
