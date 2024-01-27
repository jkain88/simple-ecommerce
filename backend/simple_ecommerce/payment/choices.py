class PaymentStatus:
    PENDING = "pending"
    FULLY_CHARGED = "fully-charged"
    PARTIALLY_CHARGED = "partially-charged"
    REFUNDED = "refunded"
    FAILED = "failed"

    CHOICES = [
        (PENDING, "Pending"),
        (FULLY_CHARGED, "Fully Charged"),
        (PARTIALLY_CHARGED, "Partially Charged"),
        (REFUNDED, "Refunded"),
        (FAILED, "Failed"),
    ]


class PaymentGateway:
    DUMMY = "dummy"

    CHOICES = [(DUMMY, "Dummy")]
