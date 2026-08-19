import logging
from django.db import models

logger = logging.getLogger(__name__)

def dashboard_callback(request, context):
    """
    Computes analytics and key metrics for Deft Innovations custom admin dashboard.
    """
    # Initialize default counts
    total_leads = 0
    new_leads = 0
    total_applications = 0
    new_applications = 0
    active_positions = 0
    total_articles = 0
    total_projects = 0

    # Fetch Contact Leads
    try:
        from apps.leads.models import ContactLead
        total_leads = ContactLead.objects.count()
        # Assume leads are new/unread if they were created recently or we check status
        # Since contact lead doesn't have a status, let's just get total leads
    except Exception as e:
        logger.warning(f"Error fetching ContactLead stats: {e}")

    # Fetch Job Applications & Positions
    try:
        from apps.careers.models import JobApplication, JobPosition
        total_applications = JobApplication.objects.count()
        new_applications = JobApplication.objects.filter(status="New").count()
        active_positions = JobPosition.objects.filter(is_active=True).count()
    except Exception as e:
        logger.warning(f"Error fetching Careers stats: {e}")

    # Fetch Blog Articles
    try:
        from apps.blog.models import Article
        total_articles = Article.objects.count()
    except Exception as e:
        logger.warning(f"Error fetching Article stats: {e}")

    # Fetch Projects
    try:
        from apps.portfolio.models import Project
        total_projects = Project.objects.count()
    except Exception as e:
        logger.warning(f"Error fetching Project stats: {e}")

    # Add variables to context
    context.update({
        "total_leads": total_leads,
        "total_applications": total_applications,
        "new_applications": new_applications,
        "active_positions": active_positions,
        "total_articles": total_articles,
        "total_projects": total_projects,
    })

    return context
