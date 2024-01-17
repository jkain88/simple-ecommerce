class AddressType:
    BILLING = "billing"
    SHIPPING = "shipping"

    CHOICES = [(BILLING, "Billing"), (SHIPPING, "Shipping")]


class Sex:
    MALE = "male"
    FEMALE = "female"
    OTHERS = "others"

    CHOICES = [(MALE, "Male"), (FEMALE, "Female"), (OTHERS, "others")]


class AddressDeliveryLabel:
    HOME = "home"
    OFFICE = "office"

    CHOICES = [(HOME, "Home"), (OFFICE, "Office")]
