
from django.urls import path

from . import views


urlpatterns =  [
    path("api/login/" , views.LoginView.as_view(), name = "login_view"),
    path("api/register/" , views.SignupView.as_view(), name = "signup_view"),
    path("api/user/<user_id>" , views.UserView.as_view(), name = "user_view"),
    path("api/users/search/" , views.UserSearchView.as_view(), name = "user_search_view"),
    path("api/users/<user_id>/contacts/" , views.UserContactsView.as_view(), name = "user_search_view"),

    
]