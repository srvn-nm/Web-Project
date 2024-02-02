
from django.urls import path

from . import views


urlpatterns =  [
    path("api/login/" , views.LoginView.as_view(), name = "login_view"),
    path("api/register/" , views.SignupView.as_view(), name = "signup_view")
]