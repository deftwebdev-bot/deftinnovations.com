from django.contrib import admin
from django.utils.html import format_html
from django.core.cache import cache
from unfold.admin import ModelAdmin
from .models import HeroContent, TrustedBrand, TeamMember, CultureGallery, Testimonial, TrustStat

def _clear_api_cache():
    """Clear all cached API responses across all routers."""
    cache.delete_many([
        'hero_content_active', 'hero_slides_active',
        'brands_active', 'team_active', 'gallery_active',
        'testimonials_all', 'trust_stats_all',
        'services_list', 'services_categorized',
    ])


@admin.register(HeroContent)
class HeroContentAdmin(ModelAdmin):
    list_display = ('headline_primary', 'headline_secondary', 'order', 'is_active', 'updated_at')
    list_editable = ('order', 'is_active')
    search_fields = ('headline_primary', 'headline_secondary', 'subheadline')
    fields = (
        'badge_text', 'headline_primary', 'headline_secondary', 'subheadline',
        'primary_cta_text', 'primary_cta_link', 'secondary_cta_text', 'secondary_cta_link',
        'video_file',
        'photo',
        'order', 'is_active',
    )

@admin.register(TrustedBrand)
class TrustedBrandAdmin(ModelAdmin):
    list_display = ('name', 'industry', 'is_featured', 'order', 'is_active')
    list_filter = ('industry', 'is_featured', 'is_active')
    list_editable = ('is_featured', 'order', 'is_active')
    search_fields = ('name', 'industry')
    fields = ('name', 'industry', 'logo', 'logo_url', 'website_url', 'is_featured', 'order', 'is_active')

@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin):
    list_display = ('name', 'role', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name', 'role')
    fields = ('name', 'role', 'photo', 'order', 'is_active')

@admin.register(CultureGallery)
class CultureGalleryAdmin(ModelAdmin):
    list_display = ('photo_preview', 'order', 'is_active', 'created_at')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    fields = ('photo', 'order', 'is_active')

    def photo_preview(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" style="height:60px;width:80px;object-fit:cover;border-radius:6px;" />',
                obj.photo
            )
        return "—"
    photo_preview.short_description = "Preview"

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        _clear_api_cache()

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        _clear_api_cache()

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        _clear_api_cache()


@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ('author', 'company', 'role', 'metric', 'order')
    list_editable = ('order',)
    search_fields = ('author', 'company', 'quote')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        _clear_api_cache()

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        _clear_api_cache()

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        _clear_api_cache()


@admin.register(TrustStat)
class TrustStatAdmin(ModelAdmin):
    list_display = ('value', 'label', 'order')
    list_editable = ('order',)
