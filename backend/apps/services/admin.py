from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Service

@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ('title', 'slug', 'category', 'icon_name', 'order')
    list_filter = ('category',)
    search_fields = ('title', 'tagline', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('order',)
    fields = (
        'title',
        'slug',
        'category',
        'tagline',
        'description',
        'icon_name',
        'image',
        'image_url',
        'deliverables',
        'business_benefits',
        'process_steps',
        'featured_stats',
        'order',
    )
