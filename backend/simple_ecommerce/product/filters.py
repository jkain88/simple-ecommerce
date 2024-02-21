from django_filters import rest_framework as filters

from .models import Product


class ProductFilter(filters.FilterSet):
    category = filters.CharFilter(field_name="category__slug")
    brand = filters.CharFilter(field_name="brand__slug")
    search = filters.CharFilter(method="search_filter")

    class Meta:
        model = Product
        fields = ["category", "brand"]

    def search_filter(self, queryset, name, value):
        return queryset.filter(name__icontains=value)
