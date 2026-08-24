from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import HeroContent, TrustedBrand, TeamMember, CultureGallery, Testimonial, TrustStat

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
                obj.photo.url
            )
        return "—"
    photo_preview.short_description = "Preview"

@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ('author', 'company', 'role', 'metric', 'order')
    list_editable = ('order',)
    search_fields = ('author', 'company', 'quote')

@admin.register(TrustStat)
class TrustStatAdmin(ModelAdmin):
    list_display = ('value', 'label', 'order')
    list_editable = ('order',)
