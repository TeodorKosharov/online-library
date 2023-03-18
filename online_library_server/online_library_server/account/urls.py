from django.urls import path
from online_library_server.account.views import register_user, login_user

urlpatterns = (
    path('register/', register_user),
    path('login/', login_user),
)
