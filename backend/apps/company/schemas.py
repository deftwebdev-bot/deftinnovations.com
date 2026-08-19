from typing import Optional, Dict, List
from pydantic import BaseModel

class HeroContentOut(BaseModel):
    id: Optional[int] = 1
    badgeText: str
    headlinePrimary: str
    headlineSecondary: str
    subheadline: str
    primaryCtaText: str
    primaryCtaLink: str
    secondaryCtaText: str
    secondaryCtaLink: str
    videoUrl: Optional[str] = None
    heroImageUrl: str

    @classmethod
    def from_model(cls, instance):
        img = ""
        if hasattr(instance, "photo") and instance.photo and hasattr(instance.photo, "url"):
            img = instance.photo.url
        elif hasattr(instance, "hero_image_url") and instance.hero_image_url:
            img = instance.hero_image_url

        return cls(
            id=instance.id if hasattr(instance, "id") else 1,
            badgeText=instance.badge_text,
            headlinePrimary=instance.headline_primary,
            headlineSecondary=instance.headline_secondary,
            subheadline=instance.subheadline,
            primaryCtaText=instance.primary_cta_text,
            primaryCtaLink=instance.primary_cta_link,
            secondaryCtaText=instance.secondary_cta_text,
            secondaryCtaLink=instance.secondary_cta_link,
            videoUrl=getattr(instance, "video_url", None) or None,
            heroImageUrl=img,
        )

class TrustedBrandOut(BaseModel):
    id: int
    name: str
    logoUrl: Optional[str] = None
    websiteUrl: Optional[str] = None

    @classmethod
    def from_model(cls, instance):
        logo_path = ""
        if hasattr(instance, "logo") and instance.logo and hasattr(instance.logo, "url"):
            logo_path = instance.logo.url
        elif hasattr(instance, "logo_url") and instance.logo_url:
            logo_path = instance.logo_url

        return cls(
            id=instance.id,
            name=instance.name,
            logoUrl=logo_path or None,
            websiteUrl=instance.website_url or None,
        )

class TeamMemberOut(BaseModel):
    id: str
    name: str
    role: str
    imageUrl: str

    @classmethod
    def from_model(cls, instance):
        img = ""
        if instance.photo and hasattr(instance.photo, "url"):
            img = instance.photo.url

        return cls(
            id=f"team-{instance.id}",
            name=instance.name,
            role=instance.role,
            imageUrl=img,
        )

class TestimonialOut(BaseModel):
    id: str
    quote: str
    author: str
    role: str
    company: str
    logoText: str
    metric: Optional[str] = None
    metricLabel: Optional[str] = None

    @classmethod
    def from_model(cls, instance):
        return cls(
            id=f"test-{instance.id}",
            quote=instance.quote,
            author=instance.author,
            role=instance.role,
            company=instance.company,
            logoText=instance.logo_text,
            metric=instance.metric or None,
            metricLabel=instance.metric_label or None,
        )

class TrustStatOut(BaseModel):
    value: str
    label: str

    @classmethod
    def from_model(cls, instance):
        return cls(value=instance.value, label=instance.label)
