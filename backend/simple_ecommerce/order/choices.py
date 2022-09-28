class OrderStatus:
    PENDING = 'pending'
    PROCESSING = 'processing'
    IN_TRANSIT = 'in transit'
    DELIVERED = 'delivered'

    CHOICES = [
        (PENDING, 'Pending'),
        (PROCESSING, 'Processing'),
        (IN_TRANSIT, 'In Transit'),
        (DELIVERED, 'Delivered')
    ]
