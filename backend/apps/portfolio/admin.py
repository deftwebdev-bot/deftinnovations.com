from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Project

@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ('title', 'client', 'category', 'industry', 'year', 'featured', 'order')
    list_filter = ('category', 'featured', 'year')
    search_fields = ('title', 'client', 'industry', 'summary', 'challenge', 'solution')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured', 'order')
