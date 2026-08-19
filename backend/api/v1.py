from typing import List, Optional
from ninja import NinjaAPI, Router
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings

from apps.blog.models import Article
from apps.blog.schemas import ArticleOut

from apps.portfolio.models import Project
from apps.portfolio.schemas import ProjectOut

from apps.services.models import Service
from apps.services.schemas import ServiceOut

from apps.company.models import HeroContent, TrustedBrand, TeamMember, Testimonial, TrustStat
from apps.company.schemas import (
    HeroContentOut,
    TrustedBrandOut,
    TeamMemberOut,
    TestimonialOut,
    TrustStatOut,
)

from apps.leads.models import ContactLead
from apps.leads.schemas import ContactIn, ContactOut

from apps.careers.models import JobPosition, JobApplication
from apps.careers.schemas import JobPositionOut, JobApplicationIn, JobApplicationOut

api = NinjaAPI(
    title="Deft Innovations Headless API",
    version="1.0.0",
    description="High-performance backend API for Deft Innovations website, careers portal, and admin management.",
    docs_url="/docs",
)

# ----------------- Articles Router -----------------
articles_router = Router(tags=["Articles"])

@articles_router.get("/", response=List[ArticleOut])
def list_articles(request, category: Optional[str] = None, featured: Optional[bool] = None):
    qs = Article.objects.all()
    if category:
        qs = qs.filter(category__iexact=category)
    if featured is not None:
        qs = qs.filter(featured=featured)
    return [ArticleOut.from_model(a) for a in qs]

@articles_router.get("/{slug}", response=ArticleOut)
def get_article(request, slug: str):
    article = get_object_or_404(Article, slug=slug)
    return ArticleOut.from_model(article)

api.add_router("/articles", articles_router)


# ----------------- Portfolio Router -----------------
portfolio_router = Router(tags=["Portfolio"])

@portfolio_router.get("/", response=List[ProjectOut])
def list_projects(request, category: Optional[str] = None, featured: Optional[bool] = None):
    qs = Project.objects.all()
    if category:
        qs = qs.filter(category__iexact=category)
    if featured is not None:
        qs = qs.filter(featured=featured)
    return [ProjectOut.from_model(p) for p in qs]

@portfolio_router.get("/{slug}", response=ProjectOut)
def get_project(request, slug: str):
    project = get_object_or_404(Project, slug=slug)
    return ProjectOut.from_model(project)

api.add_router("/projects", portfolio_router)


# ----------------- Services Router -----------------
services_router = Router(tags=["Services"])

@services_router.get("/", response=List[ServiceOut])
def list_services(request):
    qs = Service.objects.all()
    return [ServiceOut.from_model(s) for s in qs]

@services_router.get("/{slug}", response=ServiceOut)
def get_service(request, slug: str):
    service = get_object_or_404(Service, slug=slug)
    return ServiceOut.from_model(service)

api.add_router("/services", services_router)


# ----------------- Company & Social Proof Router -----------------
company_router = Router(tags=["Company"])

@company_router.get("/hero", response=HeroContentOut)
def get_hero_content(request):
    hero = HeroContent.objects.filter(is_active=True).first()
    if not hero:
        hero = HeroContent.objects.create()
    return HeroContentOut.from_model(hero)

@company_router.get("/hero/slides", response=List[HeroContentOut])
def list_hero_slides(request):
    slides = HeroContent.objects.filter(is_active=True)
    if not slides.exists():
        slides = [HeroContent.objects.create()]
    return [HeroContentOut.from_model(s) for s in slides]

@company_router.get("/brands", response=List[TrustedBrandOut])
def list_trusted_brands(request):
    qs = TrustedBrand.objects.filter(is_active=True)
    return [TrustedBrandOut.from_model(b) for b in qs]

@company_router.get("/team", response=List[TeamMemberOut])
def list_team(request):
    qs = TeamMember.objects.all()
    return [TeamMemberOut.from_model(m) for m in qs]

@company_router.get("/testimonials", response=List[TestimonialOut])
def list_testimonials(request):
    qs = Testimonial.objects.all()
    return [TestimonialOut.from_model(t) for t in qs]

@company_router.get("/trust-stats", response=List[TrustStatOut])
def list_trust_stats(request):
    qs = TrustStat.objects.all()
    return [TrustStatOut.from_model(s) for s in qs]

api.add_router("/company", company_router)


# ----------------- Careers Router -----------------
careers_router = Router(tags=["Careers"])

@careers_router.get("/jobs", response=List[JobPositionOut])
def list_jobs(request, department: Optional[str] = None):
    qs = JobPosition.objects.filter(is_active=True)
    if department:
        qs = qs.filter(department__iexact=department)
    return [JobPositionOut.from_model(j) for j in qs]

@careers_router.get("/jobs/{slug}", response=JobPositionOut)
def get_job(request, slug: str):
    job = get_object_or_404(JobPosition, slug=slug, is_active=True)
    return JobPositionOut.from_model(job)

@careers_router.post("/apply", response=JobApplicationOut)
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

@leads_router.post("/submit", response=ContactOut)
def submit_contact_form(request, data: ContactIn):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')

    lead = ContactLead.objects.create(
        name=data.name,
        company=data.company or "",
        email=data.email,
        phone=data.phone or "",
        budget=data.budget or "",
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
        f"Service Interested: {data.service}\n"
        f"Estimated Budget: {data.budget}\n\n"
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
