from django.urls import path
from online_library_server.account.views import register_user, login_user, logout_user, user_data

urlpatterns = (
    path('register/', register_user),
    path('login/', login_user),
    path('logout/', logout_user),
    path('user-data/', user_data),
)
