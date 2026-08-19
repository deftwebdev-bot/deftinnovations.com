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
    category: str
    industry: str
    summary: str
    challenge: str
    solution: str
    results: List[MetricResult]
    servicesProvided: List[str]
    technologiesUsed: List[str]
    imageUrl: str
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

        return cls(
            id=f"project-{instance.slug}",
            slug=instance.slug,
            title=instance.title,
            client=instance.client,
            category=instance.category,
            industry=instance.industry,
            summary=instance.summary,
            challenge=instance.challenge,
            solution=instance.solution,
            results=parsed_results,
            servicesProvided=instance.services_provided or [],
            technologiesUsed=instance.technologies_used or [],
            imageUrl=instance.image_url,
            galleryImages=instance.gallery_images or [],
            year=instance.year,
            featured=instance.featured,
        )
