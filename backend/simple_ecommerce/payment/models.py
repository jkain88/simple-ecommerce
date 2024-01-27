from django.conf import settings
from django.db import models
from djmoney.models.fields import MoneyField
from model_utils.models import TimeStampedModel

from .choices import PaymentGateway, PaymentStatus
from simple_ecommerce.checkout.models import Checkout
from simple_ecommerce.order.models import Order


class Payment(TimeStampedModel):
    amount = MoneyField(
        max_digits=9,
        decimal_places=2,
        null=True,
        default_currency=settings.DEFAULT_CURRENCY,
    )
    currency = models.CharField(max_length=3)
    reference = models.CharField(max_length=255)
    status = models.CharField(
        max_length=30, choices=PaymentStatus.CHOICES, default=PaymentStatus.PENDING
    )
    gateway = models.CharField(
        max_length=50, choices=PaymentGateway.CHOICES, default=PaymentGateway.DUMMY
    )
    checkout = models.ForeignKey(
        Checkout,
        null=True,
        on_delete=models.SET_NULL,
        related_name="payments",
    )
    order = models.ForeignKey(
        Order, null=True, on_delete=models.SET_NULL, related_name="payments"
    )
    customer = models.ForeignKey(
        "user.User", on_delete=models.CASCADE, related_name="payments"
    )

    def __str__(self):
        return self.reference
