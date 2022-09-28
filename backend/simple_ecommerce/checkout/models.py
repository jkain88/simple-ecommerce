from statistics import mode
from django.conf import settings
from django.db import models
from djmoney.models.fields import MoneyField
from djmoney.money import Money
from model_utils.models import TimeStampedModel

from .utils import get_line_amount
from simple_ecommerce.product.models import (
    Product,
    ProductVariant
)
from simple_ecommerce.user.models import (
    Address,
    User
)



class Checkout(TimeStampedModel):
    billing_address = models.ForeignKey(Address, null=True, on_delete=models.SET_NULL, related_name='+')
    shipping_address = models.ForeignKey(Address, null=True, on_delete=models.SET_NULL, related_name='+')
    total_amount = MoneyField(max_digits=9, decimal_places=2, null=True, default_currency=settings.DEFAULT_CURRENCY)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    


class CheckoutLine(TimeStampedModel):
    amount = MoneyField(max_digits=9, decimal_places=2, null=True, default_currency=settings.DEFAULT_CURRENCY)
    checkout = models.ForeignKey(Checkout, on_delete=models.CASCADE, related_name='lines')
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL, related_name='lines')
    product_variant = models.ForeignKey(ProductVariant, null=True, on_delete=models.SET_NULL, related_name='lines')
    quantity = models.PositiveIntegerField(default=1)
    
    def save(self, *args, **kwargs):
        self.amount = get_line_amount(self)
        return super().save(*args, **kwargs)