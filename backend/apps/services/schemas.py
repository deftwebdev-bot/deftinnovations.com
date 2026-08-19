from typing import List, Optional, Dict
from pydantic import BaseModel

class FeaturedStat(BaseModel):
    label: str
    value: str

class ServiceOut(BaseModel):
    id: str
    slug: str
    title: str
    tagline: str
    description: str
    category: str
    iconName: str
    deliverables: List[str]
    businessBenefits: List[str]
    processSteps: List[str]
    featuredStats: Optional[FeaturedStat] = None
    imageUrl: str = ""

    @classmethod
    def from_model(cls, instance):
        stats = None
        if instance.featured_stats and isinstance(instance.featured_stats, dict) and "label" in instance.featured_stats:
            stats = FeaturedStat(
                label=instance.featured_stats.get("label", ""),
                value=instance.featured_stats.get("value", "")
            )
        img = ""
        if hasattr(instance, "image") and instance.image and hasattr(instance.image, "url"):
            img = instance.image.url
        elif hasattr(instance, "image_url") and instance.image_url:
            img = instance.image_url

        return cls(
            id=instance.slug,
            slug=instance.slug,
            title=instance.title,
            tagline=instance.tagline,
            description=instance.description,
            category=instance.category,
            iconName=instance.icon_name,
            deliverables=instance.deliverables or [],
            businessBenefits=instance.business_benefits or [],
            processSteps=instance.process_steps or [],
            featuredStats=stats,
            imageUrl=img,
        )
