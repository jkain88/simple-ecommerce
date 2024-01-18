from model_utils.models import TimeStampedModel


class AddressType:
    BILLING = "billing"
    SHIPPING = "shipping"

    CHOICES = [(BILLING, "Billing"), (SHIPPING, "Shipping")]


class AddressDeliveryLabel:
    HOME = "home"
    OFFICE = "office"

    CHOICES = [(HOME, "Home"), (OFFICE, "Office")]
