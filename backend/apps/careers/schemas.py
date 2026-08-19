from typing import List, Optional
from pydantic import BaseModel, EmailStr

class JobPositionOut(BaseModel):
    id: str
    slug: str
    title: str
    department: str
    location: str
    jobType: str
    experienceLevel: str
    salaryRange: str
    overview: str
    responsibilities: List[str]
    requirements: List[str]
    perks: List[str]
    featured: bool
    isActive: bool
    createdAt: str

    @classmethod
    def from_model(cls, instance):
        return cls(
            id=f"job-{instance.id}",
            slug=instance.slug,
            title=instance.title,
            department=instance.department,
            location=instance.location,
            jobType=instance.job_type,
            experienceLevel=instance.experience_level,
            salaryRange=instance.salary_range,
            overview=instance.overview,
            responsibilities=instance.responsibilities or [],
            requirements=instance.requirements or [],
            perks=instance.perks or [],
            featured=instance.featured,
            isActive=instance.is_active,
            createdAt=instance.created_at.strftime("%B %d, %Y"),
        )

class JobApplicationIn(BaseModel):
    jobSlug: Optional[str] = None
    fullName: str
    email: EmailStr
    phone: Optional[str] = ""
    linkedinUrl: Optional[str] = ""
    portfolioUrl: Optional[str] = ""
    githubUrl: Optional[str] = ""
    resumeLink: str
    coverLetter: Optional[str] = ""

class JobApplicationOut(BaseModel):
    success: bool
    message: str
    applicationId: Optional[int] = None
