from django.contrib import admin
from django.core.cache import cache
from unfold.admin import ModelAdmin
from .models import Article

@admin.register(Article)
class ArticleAdmin(ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'published_at', 'featured', 'created_at')
    list_filter = ('category', 'featured', 'created_at')
    search_fields = ('title', 'excerpt', 'content', 'author_name', 'tags')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured',)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        cache.delete('articles_list_None_None')
        cache.delete('articles_list_None_True')
        cache.delete(f'article_{obj.slug}')

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        cache.delete('articles_list_None_None')
        cache.delete('articles_list_None_True')
        cache.delete(f'article_{obj.slug}')

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        cache.delete('articles_list_None_None')
        cache.delete('articles_list_None_True')
