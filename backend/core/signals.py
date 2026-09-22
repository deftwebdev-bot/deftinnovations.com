"""
Auto-invalidate Django core cache when CMS models are saved or deleted.

These signals ensure that any admin save is reflected immediately in the API
without needing to restart the server or manually flush the cache.
"""
import logging
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from core.cache_utils import (
    invalidate_articles_cache,
    invalidate_portfolio_cache,
    invalidate_services_cache,
    invalidate_company_cache,
    invalidate_careers_cache,
    invalidate_media_cache,
)

logger = logging.getLogger(__name__)


# ─── Blog ─────────────────────────────────────────────────────────────────────
def _on_article_change(sender, **kwargs):
    invalidate_articles_cache()

def connect_blog_signals():
    from apps.blog.models import Article
    post_save.connect(_on_article_change, sender=Article, dispatch_uid="deft_article_save")
    post_delete.connect(_on_article_change, sender=Article, dispatch_uid="deft_article_delete")


# ─── Portfolio ────────────────────────────────────────────────────────────────
def _on_project_change(sender, **kwargs):
    invalidate_portfolio_cache()
    invalidate_media_cache()

def connect_portfolio_signals():
    from apps.portfolio.models import Project
    post_save.connect(_on_project_change, sender=Project, dispatch_uid="deft_project_save")
    post_delete.connect(_on_project_change, sender=Project, dispatch_uid="deft_project_delete")


# ─── Services ─────────────────────────────────────────────────────────────────
def _on_service_change(sender, **kwargs):
    invalidate_services_cache()
    invalidate_media_cache()

def connect_services_signals():
    from apps.services.models import Service, ServiceCategory
    post_save.connect(_on_service_change, sender=Service, dispatch_uid="deft_service_save")
    post_delete.connect(_on_service_change, sender=Service, dispatch_uid="deft_service_delete")
    post_save.connect(_on_service_change, sender=ServiceCategory, dispatch_uid="deft_servicecategory_save")
    post_delete.connect(_on_service_change, sender=ServiceCategory, dispatch_uid="deft_servicecategory_delete")


# ─── Company ──────────────────────────────────────────────────────────────────
def _on_company_change(sender, **kwargs):
    invalidate_company_cache()
    invalidate_media_cache()

def connect_company_signals():
    from apps.company.models import HeroContent, TrustedBrand, TeamMember, CultureGallery, Testimonial, TrustStat
    for model, uid_base in [
        (HeroContent, "deft_herocontent"),
        (TrustedBrand, "deft_trustedbrand"),
        (TeamMember, "deft_teammember"),
        (CultureGallery, "deft_culturegallery"),
        (Testimonial, "deft_testimonial"),
        (TrustStat, "deft_truststat"),
    ]:
        post_save.connect(_on_company_change, sender=model, dispatch_uid=f"{uid_base}_save")
        post_delete.connect(_on_company_change, sender=model, dispatch_uid=f"{uid_base}_delete")


# ─── Careers ──────────────────────────────────────────────────────────────────
def _on_jobposition_change(sender, **kwargs):
    invalidate_careers_cache()

def connect_careers_signals():
    from apps.careers.models import JobPosition
    post_save.connect(_on_jobposition_change, sender=JobPosition, dispatch_uid="deft_jobposition_save")
    post_delete.connect(_on_jobposition_change, sender=JobPosition, dispatch_uid="deft_jobposition_delete")


# ─── Entry point ──────────────────────────────────────────────────────────────
def connect_all():
    """Called from CoreConfig.ready() to register all cache-invalidation signals."""
    connect_blog_signals()
    connect_portfolio_signals()
    connect_services_signals()
    connect_company_signals()
    connect_careers_signals()
    logger.info("[cache] Signal-based cache invalidation registered for all CMS models")
