from django_filters import rest_framework as filters
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .filters import CategoryFilter, ProductFilter
from .models import Brand, Category, Product, ProductImage, ProductVariant
from .serializers import (
    BrandSerializer,
    CategorySerializer,
    ProductImageSerializer,
    ProductSerializer,
    ProductVariantSerializer,
    ProductsDeleteSerializer,
)


class CategoryCreate(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = CategoryFilter


class BrandList(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class BranCreate(generics.CreateAPIView):
    serializer_class = BrandSerializer
    permission_classes = [IsAdminUser]


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        method = self.request.method
        if method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = []
        return super(CategoryDetail, self).get_permissions()


class ProductCreate(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = ProductFilter


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_permissions(self):
        method = self.request.method
        if method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = []
        return super(ProductDetail, self).get_permissions()


class ProductVariantCreate(generics.CreateAPIView):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAdminUser]


class ProductVariantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAdminUser]


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAdminUser]


class ProductsDelete(generics.GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsDeleteSerializer
    permission_classes = [IsAdminUser]

    def delete(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        products = serializer.validated_data["product_ids"]

        Product.objects.filter(id__in=[product.id for product in products]).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
