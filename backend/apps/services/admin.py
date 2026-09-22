from django.contrib import admin
from django.core.cache import cache
from unfold.admin import ModelAdmin
from .models import ServiceCategory, Service


class ServiceInline(admin.TabularInline):
    model = Service
    extra = 0
    fields = ('title', 'slug', 'tagline', 'icon_name', 'featured', 'order')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', 'title')


def _clear_services_cache():
    cache.delete_many([
        'services_list_None', 'services_list_True', 'services_list_False',
        'services_categorized',
    ])
    # Clear individual service detail caches
    from .models import Service
    for slug in Service.objects.values_list('slug', flat=True):
        cache.delete(f'service_{slug}')


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




    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        _clear_services_cache()

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        _clear_services_cache()

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        _clear_services_cache()


@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ('title', 'slug', 'category_display', 'icon_name', 'featured', 'order')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'tagline', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured', 'order')
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
        'featured',
        'order',
    )

    def category_display(self, obj):
        return str(obj.category) if obj.category else '—'
    category_display.short_description = 'Category'

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        _clear_services_cache()

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        _clear_services_cache()

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        _clear_services_cache()
