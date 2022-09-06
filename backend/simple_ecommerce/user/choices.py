class AddressType:
    BILLING = "billing"
    SHIPPING = "shipping"

    CHOICES = [
        (BILLING, "Billing"),
        (SHIPPING, "Shipping")
    ]


class Sex:
    MALE = "male"
    FEMALE = "female"

    CHOICES = [
        (MALE, "Male"),
        (FEMALE, "Female")
    ]
