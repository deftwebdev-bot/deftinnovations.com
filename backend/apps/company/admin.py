from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import HeroContent, TrustedBrand, TeamMember, Testimonial, TrustStat

@admin.register(HeroContent)
class HeroContentAdmin(ModelAdmin):
    list_display = ('headline_primary', 'headline_secondary', 'order', 'is_active', 'updated_at')
    list_editable = ('order', 'is_active')
    search_fields = ('headline_primary', 'headline_secondary', 'subheadline')
    fields = (
        'badge_text',
        'headline_primary',
        'headline_secondary',
        'subheadline',
        'primary_cta_text',
        'primary_cta_link',
        'secondary_cta_text',
        'secondary_cta_link',
        'video_url',
        'photo',
        'hero_image_url',
        'order',
        'is_active',
    )

@admin.register(TrustedBrand)
class TrustedBrandAdmin(ModelAdmin):
    list_display = ('name', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name',)
    fields = ('name', 'logo', 'logo_url', 'website_url', 'order', 'is_active')

@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin):
    list_display = ('name', 'role', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'role')
    fields = ('name', 'role', 'photo', 'order')

@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ('author', 'company', 'role', 'metric', 'order')
    list_editable = ('order',)
    search_fields = ('author', 'company', 'quote')

@admin.register(TrustStat)
class TrustStatAdmin(ModelAdmin):
    list_display = ('value', 'label', 'order')
    list_editable = ('order',)
