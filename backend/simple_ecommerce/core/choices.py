from model_utils.models import TimeStampedModel


class AddressDeliveryLabel:
    HOME = "home"
    OFFICE = "office"

    CHOICES = [(HOME, "Home"), (OFFICE, "Office")]
