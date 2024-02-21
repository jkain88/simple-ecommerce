from drf_yasg.inspectors import PaginatorInspector
from drf_yasg import openapi


class CustomPaginatorInspector(PaginatorInspector):
    def get_paginated_response(self, paginator, response_schema):
        return openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "next": openapi.Schema(type=openapi.TYPE_STRING),
                "previous": openapi.Schema(type=openapi.TYPE_STRING),
                "total_pages": openapi.Schema(type=openapi.TYPE_INTEGER),
                "count": openapi.Schema(type=openapi.TYPE_INTEGER),
                "results": response_schema,
            },
            required=["results"],
        )
