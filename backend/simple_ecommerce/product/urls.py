from django.urls import path

from . import views


urlpatterns = [
    path('', views.ProductList.as_view(), name='product_list'),
    path('categories', views.CategoryList.as_view(), name='category_list'),
    path('category/<int:pk>', views.CategoryDetail.as_view(), name='category_detail'),
    path('category/create/', views.CategoryCreate.as_view(), name='category_create'),
    path('create/', views.ProductCreate.as_view(), name='product_create'),
    path('<int:pk>', views.ProductDetail.as_view(), name='product_detail'),
    path('variant/create/', views.ProductVariantCreate.as_view(), name='product_variant_create'),
    path('variant/<int:pk>', views.ProductVariantDetail.as_view(), name='product_variant_detail')
]