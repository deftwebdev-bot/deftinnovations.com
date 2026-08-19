from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from api.v1 import api
import core.admin

# Customize Django Admin branding
admin.site.site_header = "Deft Innovations Admin"
admin.site.site_title = "Deft Innovations Portal"
admin.site.index_title = "Content Management & Lead Pipeline"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', api.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
