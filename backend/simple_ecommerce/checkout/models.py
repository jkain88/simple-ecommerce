from statistics import mode
from django.conf import settings
from django.db import models
from djmoney.models.fields import MoneyField
from djmoney.money import Money
from model_utils.models import TimeStampedModel

from .utils import get_line_amount
from simple_ecommerce.core.models import Address
from simple_ecommerce.product.models import Product, ProductVariant
from simple_ecommerce.user.models import User


class Checkout(TimeStampedModel):
    shipping_address = models.ForeignKey(
        Address,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
        db_constraint=False,
    )
    user = models.OneToOneField(
        User, null=True, on_delete=models.SET_NULL, related_name="checkout"
    )

    @property
    def total_amount(self):
        return self.lines.all().aggregate(total=models.Sum("amount"))["total"]


class CheckoutLine(TimeStampedModel):
    amount = MoneyField(
        max_digits=9,
        decimal_places=2,
        null=True,
        default_currency=settings.DEFAULT_CURRENCY,
    )
    checkout = models.ForeignKey(
        Checkout, on_delete=models.CASCADE, related_name="lines"
    )
    product = models.ForeignKey(
        Product,
        null=True,
        on_delete=models.SET_NULL,
        related_name="lines",
        db_constraint=False,
    )
    product_variant = models.ForeignKey(
        ProductVariant,
        null=True,
        on_delete=models.SET_NULL,
        related_name="lines",
        db_constraint=False,
    )
    quantity = models.PositiveIntegerField(default=1)

    def save(self, *args, **kwargs):
        self.amount = get_line_amount(self)
        return super().save(*args, **kwargs)
