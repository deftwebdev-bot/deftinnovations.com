from typing import List, Optional
from pydantic import BaseModel

class MetricResult(BaseModel):
    metric: str
    label: str

class ProjectOut(BaseModel):
    id: str
    slug: str
    title: str
    client: str
    clientId: Optional[int] = None
    category: str
    industry: str
    summary: str
    challenge: str
    solution: str
    results: List[MetricResult]
    servicesProvided: List[str]
    technologiesUsed: List[str]
    imageUrl: str = ""
    videoUrl: Optional[str] = None
    galleryImages: List[str]
    year: str
    featured: bool

    @classmethod
    def from_model(cls, instance):
        # normalize results
        raw_results = instance.results or []
        parsed_results = []
        for r in raw_results:
            if isinstance(r, dict):
                parsed_results.append(MetricResult(metric=r.get("metric", ""), label=r.get("label", "")))

        img = ""
        if hasattr(instance, 'image') and instance.image and hasattr(instance.image, 'url'):
            img = instance.image.url
        elif hasattr(instance, 'image_url') and instance.image_url:
            img = instance.image_url

        client_id = None
        if hasattr(instance, 'client_ref') and instance.client_ref:
            client_id = instance.client_ref.id

        return cls(
            id=f"project-{instance.slug}",
            slug=instance.slug,
            title=instance.title,
            client=instance.client,
            clientId=client_id,
            category=instance.category,
            industry=instance.industry,
            summary=instance.summary,
            challenge=instance.challenge,
            solution=instance.solution,
            results=parsed_results,
            servicesProvided=instance.services_provided or [],
            technologiesUsed=instance.technologies_used or [],
            imageUrl=img,
            videoUrl=instance.video_url or None,
            galleryImages=instance.gallery_images or [],
            year=instance.year,
            featured=instance.featured,
        )
