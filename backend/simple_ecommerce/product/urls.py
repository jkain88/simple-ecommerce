from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

product_image_create = views.ProductImageViewSet.as_view(
    {
        "post": "create",
    }
)


product_image_detail = views.ProductImageViewSet.as_view(
    {"get": "retrieve", "delete": "destroy", "put": "update", "patch": "partial_update"}
)


urlpatterns = [
    path("", views.ProductList.as_view(), name="product_list"),
    path("detail/<str:slug>", views.ProductDetail.as_view(), name="product_detail"),
    path("categories", views.CategoryList.as_view(), name="category_list"),
    path("category/<int:pk>", views.CategoryDetail.as_view(), name="category_detail"),
    path("category/create/", views.CategoryCreate.as_view(), name="category_create"),
    path("create/", views.ProductCreate.as_view(), name="product_create"),
    path("image/create/", product_image_create, name="product_image_create"),
    path("image/<int:pk>", product_image_detail, name="product_image_detail"),
    path(
        "variant/create/",
        views.ProductVariantCreate.as_view(),
        name="product_variant_create",
    ),
    path(
        "variant/<int:pk>",
        views.ProductVariantDetail.as_view(),
        name="product_variant_detail",
    ),
]
