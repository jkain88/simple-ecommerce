from django_filters import rest_framework as filters
from .models import Order


class OrderFilter(filters.FilterSet):
    search = filters.CharFilter(field_name="reference", lookup_expr="icontains")

    class Meta:
        model = Order
        fields = ["status"]
