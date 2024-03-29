import random
import string

from django.conf import settings
from django.db import models
from djmoney.models.fields import MoneyField
from model_utils.models import TimeStampedModel

from .choices import OrderStatus
from simple_ecommerce.core.models import Address
from simple_ecommerce.product.models import Product, ProductVariant
from simple_ecommerce.user.models import User


class Order(TimeStampedModel):
    billing_address = models.ForeignKey(
        Address,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
        db_constraint=False,
    )
    shipping_address = models.ForeignKey(
        Address,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
        db_constraint=False,
    )
    total_amount = MoneyField(
        max_digits=9,
        decimal_places=2,
        null=True,
        default_currency=settings.DEFAULT_CURRENCY,
    )
    user = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        db_constraint=False,
        related_name="orders",
    )
    status = models.CharField(
        max_length=20, choices=OrderStatus.CHOICES, default=OrderStatus.PENDING
    )
    reference = models.CharField(max_length=30, blank=True)

    def save(self, *args, **kwargs):
        self.reference = "".join(
            random.choices(string.ascii_lowercase + string.digits, k=12)
        )
        super(Order, self).save(*args, **kwargs)


class OrderLine(TimeStampedModel):
    amount = MoneyField(
        max_digits=9,
        decimal_places=2,
        null=True,
        default_currency=settings.DEFAULT_CURRENCY,
    )
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="lines")
    product = models.ForeignKey(
        Product,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
        db_constraint=False,
    )
    product_variant = models.ForeignKey(
        ProductVariant,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
        db_constraint=False,
    )
    quantity = models.PositiveIntegerField(default=1)
