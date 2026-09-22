from typing import Optional
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
        img = instance.photo or ""
        video = instance.video_file or None

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
            videoUrl=video,
            heroImageUrl=img,
        )

class TrustedBrandOut(BaseModel):
    id: int
    name: str
    industry: str = ""
    logoUrl: Optional[str] = None
    websiteUrl: Optional[str] = None
    isFeatured: bool = False

    @classmethod
    def from_model(cls, instance):
        logo_path = instance.logo or instance.logo_url or None

        return cls(
            id=instance.id,
            name=instance.name,
            industry=instance.industry or "",
            logoUrl=logo_path,
            websiteUrl=instance.website_url or None,
            isFeatured=instance.is_featured,
        )

class TeamMemberOut(BaseModel):
    id: str
    name: str
    role: str
    imageUrl: str
    order: int = 0

    @classmethod
    def from_model(cls, instance):
        return cls(
            id=f"team-{instance.id}",
            name=instance.name,
            role=instance.role,
            imageUrl=instance.photo or "",
            order=instance.order or 0,
        )

class CultureGalleryOut(BaseModel):
    id: str
    imageUrl: str
    order: int = 0

    @classmethod
    def from_model(cls, instance):
        return cls(
            id=f"gal-{instance.id}",
            imageUrl=instance.photo or "",
            order=instance.order or 0,
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
    imageUrl: str = ""

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
            imageUrl=getattr(instance, "image_url", "") or "",
        )

class TrustStatOut(BaseModel):
    value: str
    label: str

    @classmethod
    def from_model(cls, instance):
        return cls(value=instance.value, label=instance.label)
