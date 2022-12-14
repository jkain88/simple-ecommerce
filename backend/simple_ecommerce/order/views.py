import re
from django.http import Http404
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .models import Order
from .serializers import OrderSerializer

# Create your views here.
class OrderList(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        method = self.request.method

        if method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super(OrderDetail, self).get_permissions()


    def retrieve(self, request, *args, **kwargs):
        if request.user != self.get_object().user and not request.user.is_staff:
            raise Http404
        return super().retrieve(request, *args, **kwargs)