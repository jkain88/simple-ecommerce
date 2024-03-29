import re
from django.http import Http404
from django_filters import rest_framework as filters
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .filters import OrderFilter
from .models import Order
from .serializers import OrderSerializer


# Create your views here.
class OrderList(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = OrderFilter

    def get_queryset(self):
        if self.request.user.is_staff or self.request.user.is_superuser:
            return Order.objects.all().order_by("-created")
        return self.request.user.orders.all().order_by("-created")


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = "reference"

    def get_permissions(self):
        method = self.request.method

        if method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super(OrderDetail, self).get_permissions()

    def retrieve(self, request, *args, **kwargs):
        if request.user != self.get_object().user and not request.user.is_staff:
            raise Http404
        return super().retrieve(request, *args, **kwargs)
