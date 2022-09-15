from django.urls import path

from . import views


urlpatterns = [
    path('', views.ProductList.as_view(), name='product_list'),
    path('categories', views.CategoryList.as_view(), name='category_list'),
    path('category/<int:pk>', views.CategoryRetrieveUpdateDestroy.as_view(), name='category_retrieve_update_destory'),
    path('category/create/', views.CategoryCreate.as_view(), name='category_create'),
    path('create/', views.ProductCreate.as_view(), name='product_create'),
    path('<int:pk>', views.ProductRetrieveUpdateDestroy.as_view(), name='product_retrieve_update_destroy'),
    path('variant/create/', views.ProductVariantCreate.as_view(), name='product_variant_create')
]