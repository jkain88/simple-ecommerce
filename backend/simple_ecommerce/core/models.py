from django.db import models
from model_utils.models import TimeStampedModel

from .choices import AddressDeliveryLabel
from simple_ecommerce.user.models import User


class PublishableModel(models.Model):
    is_published = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Address(TimeStampedModel):
    is_default = models.BooleanField(default=False)
    contact_number = models.CharField(max_length=30, blank=True)
    city_area = models.CharField(max_length=100)
    city = models.CharField(max_length=70)
    postal_code = models.CharField(max_length=20)
    province = models.CharField(max_length=70)
    street = models.CharField(max_length=100, blank=True)
    delivery_label = models.CharField(
        max_length=15,
        choices=AddressDeliveryLabel.CHOICES,
        default=AddressDeliveryLabel.HOME,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="addresses",
        db_constraint=False,
        null=True,
    )
