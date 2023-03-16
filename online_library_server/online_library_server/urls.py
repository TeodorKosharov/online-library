from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('online_library_server.account.urls')),
    path('core/', include('online_library_server.core.urls'))
]
