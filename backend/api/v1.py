from typing import List, Optional
from ninja import NinjaAPI, Router
from api.throttling import GlobalAnonRateThrottle, LeadsRateThrottle, CareersRateThrottle
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache

from apps.blog.models import Article
from apps.blog.schemas import ArticleOut

from apps.portfolio.models import Project
from apps.portfolio.schemas import ProjectOut

from apps.services.models import Service, ServiceCategory
from apps.services.schemas import ServiceOut, ServiceCategoryOut

from apps.company.models import HeroContent, TrustedBrand, TeamMember, CultureGallery, Testimonial, TrustStat
from apps.company.schemas import (
    HeroContentOut,
    TrustedBrandOut,
    TeamMemberOut,
    CultureGalleryOut,
    TestimonialOut,
    TrustStatOut,
)

from apps.leads.models import ContactLead
from apps.leads.schemas import ContactIn, ContactOut

from api.media import media_router

from apps.careers.models import JobPosition, JobApplication
from apps.careers.schemas import JobPositionOut, JobApplicationIn, JobApplicationOut

api = NinjaAPI(
    title="Deft Innovations Headless API",
    version="1.0.0",
    description="High-performance backend API for Deft Innovations website, careers portal, and admin management.",
    # Swagger docs only in development — don't advertise the API surface publicly.
    docs_url="/docs" if settings.DEBUG else None,
    # Baseline per-IP throttle for all anonymous API traffic.
    throttle=GlobalAnonRateThrottle("300/m"),
)

# ----------------- Articles Router -----------------
articles_router = Router(tags=["Articles"])

@articles_router.get("/", response=List[ArticleOut])
def list_articles(request, category: Optional[str] = None, featured: Optional[bool] = None):
    cache_key = f"articles_list_{category}_{featured}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = Article.objects.all()
    if category:
        qs = qs.filter(category__iexact=category)
    if featured is not None:
        qs = qs.filter(featured=featured)
    result = [ArticleOut.from_model(a) for a in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@articles_router.get("/{slug}", response=ArticleOut)
def get_article(request, slug: str):
    cache_key = f"article_{slug}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    article = get_object_or_404(Article, slug=slug)
    result = ArticleOut.from_model(article)
    cache.set(cache_key, result, timeout=3600)
    return result

api.add_router("/articles", articles_router)


# ----------------- Portfolio Router -----------------
portfolio_router = Router(tags=["Portfolio"])

@portfolio_router.get("/", response=List[ProjectOut])
def list_projects(request, category: Optional[str] = None, featured: Optional[bool] = None):
    cache_key = f"projects_list_{category}_{featured}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = Project.objects.select_related('client_ref').all()
    if category:
        qs = qs.filter(category__iexact=category)
    if featured is not None:
        qs = qs.filter(featured=featured)
    result = [ProjectOut.from_model(p) for p in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@portfolio_router.get("/{slug}", response=ProjectOut)
def get_project(request, slug: str):
    cache_key = f"project_{slug}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    project = get_object_or_404(Project.objects.select_related('client_ref'), slug=slug)
    result = ProjectOut.from_model(project)
    cache.set(cache_key, result, timeout=3600)
    return result

api.add_router("/projects", portfolio_router)


# ----------------- Services Router -----------------
services_router = Router(tags=["Services"])

@services_router.get("/", response=List[ServiceOut])
def list_services(request, featured: Optional[bool] = None):
    cache_key = f"services_list_{featured}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = Service.objects.select_related('category').all()
    if featured is not None:
        qs = qs.filter(featured=featured)
    result = [ServiceOut.from_model(s) for s in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@services_router.get("/categorized", response=List[ServiceCategoryOut])
def list_categorized_services(request):
    """Returns categories with nested services — the grouped view."""
    cache_key = "services_categorized"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = ServiceCategory.objects.filter(is_active=True).prefetch_related('services').order_by('order', 'title')
    result = [ServiceCategoryOut.from_model(c) for c in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@services_router.get("/{slug}", response=ServiceOut)
def get_service(request, slug: str):
    cache_key = f"service_{slug}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    service = get_object_or_404(Service.objects.select_related('category'), slug=slug)
    result = ServiceOut.from_model(service)
    cache.set(cache_key, result, timeout=3600)
    return result

api.add_router("/services", services_router)


# ----------------- Company & Social Proof Router -----------------
company_router = Router(tags=["Company"])

@company_router.get("/hero", response=HeroContentOut)
def get_hero_content(request):
    cache_key = "hero_content_active"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    hero = HeroContent.objects.filter(is_active=True).first()
    if not hero:
        hero = HeroContent.objects.create()
    result = HeroContentOut.from_model(hero)
    cache.set(cache_key, result, timeout=3600)
    return result

@company_router.get("/hero/slides", response=List[HeroContentOut])
def list_hero_slides(request):
    cache_key = "hero_slides_active"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    slides = HeroContent.objects.filter(is_active=True)
    if not slides.exists():
        slides = [HeroContent.objects.create()]
    result = [HeroContentOut.from_model(s) for s in slides]
    cache.set(cache_key, result, timeout=3600)
    return result

@company_router.get("/brands", response=List[TrustedBrandOut])
def list_trusted_brands(request):
    cache_key = "brands_active"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = TrustedBrand.objects.filter(is_active=True)
    result = [TrustedBrandOut.from_model(b) for b in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@company_router.get("/team", response=List[TeamMemberOut])
def list_team(request):
    cache_key = "team_active"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = TeamMember.objects.filter(is_active=True).order_by("order", "id")
    result = [TeamMemberOut.from_model(m) for m in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@company_router.get("/gallery", response=List[CultureGalleryOut])
def list_gallery(request):
    cache_key = "gallery_active"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = CultureGallery.objects.filter(is_active=True).order_by("order", "-created_at")
    result = [CultureGalleryOut.from_model(g) for g in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@company_router.get("/testimonials", response=List[TestimonialOut])
def list_testimonials(request):
    cache_key = "testimonials_all"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = Testimonial.objects.all()
    result = [TestimonialOut.from_model(t) for t in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@company_router.get("/trust-stats", response=List[TrustStatOut])
def list_trust_stats(request):
    cache_key = "trust_stats_all"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = TrustStat.objects.all()
    result = [TrustStatOut.from_model(s) for s in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

api.add_router("/company", company_router)


# ----------------- Careers Router -----------------
careers_router = Router(tags=["Careers"])

@careers_router.get("/jobs", response=List[JobPositionOut])
def list_jobs(request, department: Optional[str] = None):
    cache_key = f"jobs_list_{department}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    qs = JobPosition.objects.filter(is_active=True)
    if department:
        qs = qs.filter(department__iexact=department)
    result = [JobPositionOut.from_model(j) for j in qs]
    cache.set(cache_key, result, timeout=3600)
    return result

@careers_router.get("/jobs/{slug}", response=JobPositionOut)
def get_job(request, slug: str):
    cache_key = f"job_{slug}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached
    job = get_object_or_404(JobPosition, slug=slug, is_active=True)
    result = JobPositionOut.from_model(job)
    cache.set(cache_key, result, timeout=3600)
    return result

@careers_router.post("/apply", response=JobApplicationOut, throttle=CareersRateThrottle())
def apply_for_job(request, data: JobApplicationIn):
    job = None
    if data.jobSlug:
        job = JobPosition.objects.filter(slug=data.jobSlug).first()

    app = JobApplication.objects.create(
        job=job,
        full_name=data.fullName,
        email=data.email,
        phone=data.phone or "",
        linkedin_url=data.linkedinUrl or "",
        portfolio_url=data.portfolioUrl or "",
        github_url=data.githubUrl or "",
        resume_link=data.resumeLink,
        cover_letter=data.coverLetter or "",
    )

    job_title = job.title if job else "General Application"
    subject = f"💼 New Job Application: {data.fullName} for {job_title}"
    body = (
        f"New Candidate Application on Deft Innovations Portal:\n\n"
        f"Position: {job_title}\n"
        f"Candidate: {data.fullName}\n"
        f"Email: {data.email}\n"
        f"Phone: {data.phone}\n"
        f"Resume Link: {data.resumeLink}\n"
        f"Portfolio: {data.portfolioUrl}\n"
        f"LinkedIn: {data.linkedinUrl}\n\n"
        f"Cover Note:\n{data.coverLetter}\n"
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass

    return JobApplicationOut(
        success=True,
        message=f"Application for '{job_title}' received successfully! Our talent team will review and get in touch.",
        applicationId=app.id,
    )

api.add_router("/careers", careers_router)


# ----------------- Leads & Inquiries Router -----------------
leads_router = Router(tags=["Leads"])

@leads_router.post("/submit", response=ContactOut, throttle=LeadsRateThrottle())
def submit_contact_form(request, data: ContactIn):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')

    lead = ContactLead.objects.create(
        name=data.name,
        company=data.company or "",
        email=data.email,
        phone=data.phone or "",
        service=data.service or "",
        message=data.message,
        ip_address=ip,
    )

    subject = f"🚀 New Inquiry: {data.name} ({data.company or 'Direct'})"
    body = (
        f"New Lead Submitted on Deft Innovations Website:\n\n"
        f"Name: {data.name}\n"
        f"Email: {data.email}\n"
        f"Company: {data.company}\n"
        f"Phone: {data.phone}\n"
        f"Service Interested: {data.service}\n\n"
        f"Message:\n{data.message}\n"
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass

    return ContactOut(
        success=True,
        message="Your inquiry has been received. Our team will review and respond promptly.",
        leadId=lead.id,
    )

api.add_router("/contact", leads_router)


# ----------------- Media Proxy Router -----------------
api.add_router("/media", media_router)
