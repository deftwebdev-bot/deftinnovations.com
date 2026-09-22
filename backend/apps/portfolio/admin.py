from django.contrib import admin
from django.core.cache import cache
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
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        cache.delete('projects_list_None_None')
        cache.delete('projects_list_None_True')
        cache.delete(f'project_{obj.slug}')

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        cache.delete('projects_list_None_None')
        cache.delete('projects_list_None_True')
        cache.delete(f'project_{obj.slug}')

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        cache.delete('projects_list_None_None')
        cache.delete('projects_list_None_True')

    fields = (
        'title', 'slug', 'client', 'client_ref', 'category', 'industry', 'year',
        'summary', 'challenge', 'solution',
        'image', 'image_url', 'video_url',
        'results', 'services_provided', 'technologies_used',
        'gallery_images', 'featured', 'order',
    )
