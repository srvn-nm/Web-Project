
from django.urls import path

from . import views


urlpatterns =  [
    path("api/" , views.product_views, name = "product_view")
]