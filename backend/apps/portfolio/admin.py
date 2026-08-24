from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Project

@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ('title', 'client', 'client_ref', 'category', 'industry', 'year', 'featured', 'order')
    list_filter = ('category', 'featured', 'year')
    search_fields = ('title', 'client', 'industry', 'summary', 'challenge', 'solution')
    autocomplete_fields = ('client_ref',)
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured', 'order')
    fields = (
        'title', 'slug', 'client', 'client_ref', 'category', 'industry', 'year',
        'summary', 'challenge', 'solution',
        'image', 'image_url', 'video_url',
        'results', 'services_provided', 'technologies_used',
        'gallery_images', 'featured', 'order',
    )
