from typing import List, Optional
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
    categoryName: str = ""
    categoryId: str = ""
    categoryImageUrl: str = ""
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

        cat_name = ""
        cat_id = ""
        cat_img = ""
        if hasattr(instance, "category") and instance.category:
            cat_name = instance.category.title
            cat_id = instance.category.slug
            if hasattr(instance.category, 'image') and instance.category.image and hasattr(instance.category.image, 'url'):
                cat_img = instance.category.image.url
            elif hasattr(instance.category, 'image_url') and instance.category.image_url:
                cat_img = instance.category.image_url

        return cls(
            id=instance.slug,
            slug=instance.slug,
            title=instance.title,
            tagline=instance.tagline,
            description=instance.description,
            categoryName=cat_name,
            categoryId=cat_id,
            categoryImageUrl=cat_img,
            iconName=instance.icon_name,
            deliverables=instance.deliverables or [],
            businessBenefits=instance.business_benefits or [],
            processSteps=instance.process_steps or [],
            featuredStats=stats,
            imageUrl=img,
        )


class ServiceCategoryOut(BaseModel):
    id: str
    slug: str
    title: str
    iconName: str
    description: str
    imageUrl: str = ""
    services: List[ServiceOut]

    @classmethod
    def from_model(cls, instance):
        services = [
            ServiceOut.from_model(s)
            for s in instance.services.all().order_by('order', 'title')
        ]
        img = ""
        if hasattr(instance, 'image') and instance.image and hasattr(instance.image, 'url'):
            img = instance.image.url
        elif hasattr(instance, 'image_url') and instance.image_url:
            img = instance.image_url

        return cls(
            id=str(instance.pk),
            slug=instance.slug,
            title=instance.title,
            iconName=instance.icon_name,
            description=instance.description or "",
            imageUrl=img,
            services=services,
        )
