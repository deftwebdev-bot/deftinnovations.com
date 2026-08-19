from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Article

@admin.register(Article)
class ArticleAdmin(ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'published_at', 'featured', 'created_at')
    list_filter = ('category', 'featured', 'created_at')
    search_fields = ('title', 'excerpt', 'content', 'author_name', 'tags')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured',)
