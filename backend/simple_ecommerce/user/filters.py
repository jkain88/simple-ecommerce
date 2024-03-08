from django.db.models import Q
from django_filters import rest_framework as filters

from .models import User


class UserFilter(filters.FilterSet):
    search = filters.CharFilter(method="search_filter")

    class Meta:
        model = User
        fields = ["email"]

    def search_filter(self, queryset, name, value):
        return queryset.filter(
            Q(first_name__icontains=value)
            | Q(last_name__icontains=value)
            | Q(email__icontains=value)
        )
