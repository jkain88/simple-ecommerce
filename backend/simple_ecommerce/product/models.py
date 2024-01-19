from django.conf import settings
from django.db import models
from django.utils.text import slugify
from djmoney.models.fields import MoneyField
from model_utils.models import TimeStampedModel

from simple_ecommerce.core.models import PublishableModel


class Category(PublishableModel, TimeStampedModel):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=255, unique=True, null=True)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, related_name="children"
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Brand(TimeStampedModel):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100, unique=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(PublishableModel, TimeStampedModel):
    name = models.CharField(max_length=150)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, null=True, related_name="products"
    )
    brand = models.ForeignKey(
        Brand, on_delete=models.PROTECT, null=True, related_name="products"
    )
    price = MoneyField(
        max_digits=9,
        decimal_places=2,
        null=True,
        default_currency=settings.DEFAULT_CURRENCY,
    )
    sku = models.CharField(max_length=255, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    quantity_allocated = models.PositiveIntegerField(default=0)
    has_variants = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    slug = models.SlugField(max_length=255, unique=True, null=True)
    description = models.TextField(null=True)
    thumbnail = models.ImageField(upload_to="media/products/", null=True)

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ProductVariant(TimeStampedModel):
    name = models.CharField(max_length=150)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="variants"
    )
    price = MoneyField(
        max_digits=9,
        decimal_places=2,
        null=True,
        default_currency=settings.DEFAULT_CURRENCY,
    )
    sku = models.CharField(max_length=255, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    quantity_allocated = models.PositiveIntegerField(default=0)
    thumbnail = models.ImageField(upload_to="media/products/", null=True)


class ProductImage(models.Model):
    image = models.ImageField(upload_to="media/products/")
    product = models.ForeignKey(
        Product, null=True, on_delete=models.CASCADE, related_name="images"
    )
    variant = models.ForeignKey(
        ProductVariant, null=True, on_delete=models.SET_NULL, related_name="images"
    )
    alt = models.CharField(max_length=50, blank=True)
