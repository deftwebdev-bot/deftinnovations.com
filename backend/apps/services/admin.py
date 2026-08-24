from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import ServiceCategory, Service


class ServiceInline(admin.TabularInline):
    model = Service
    extra = 0
    fields = ('title', 'slug', 'tagline', 'icon_name', 'order')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', 'title')


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(ModelAdmin):
    list_display = ('title', 'slug', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('order', 'is_active')
    inlines = [ServiceInline]
    fields = (
        'title',
        'slug',
        'icon_name',
        'description',
        'image',
        'image_url',
        'order',
        'is_active',
    )




@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ('title', 'slug', 'category_display', 'icon_name', 'order')
    list_filter = ('category',)
    search_fields = ('title', 'tagline', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('order',)
    fields = (
        'category',
        'title',
        'slug',
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

    def category_display(self, obj):
        return str(obj.category) if obj.category else '—'
    category_display.short_description = 'Category'
