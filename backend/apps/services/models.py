from django.db import models
from django.utils.text import slugify


class ServiceCategory(models.Model):
    """Top-level service group, e.g. '01 — Digital Marketing'"""
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    title = models.CharField(max_length=255)
    icon_name = models.CharField(max_length=50, default="TrendingUp",
                                 help_text="Lucide icon name, e.g. TrendingUp, Palette, Code2")
    description = models.TextField(blank=True, help_text="Optional category description")
    image = models.URLField(max_length=500, blank=True, null=True,
                             verbose_name="Category Image URL", help_text="Paste category cover image URL")
    image_url = models.URLField(max_length=500, blank=True, null=True,
                                help_text="Optional fallback image URL")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service Category'
        verbose_name_plural = 'Service Categories'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE,
                                 related_name='services', null=True, blank=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    title = models.CharField(max_length=255)
    tagline = models.CharField(max_length=500)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, default="TrendingUp",
                                 help_text="Lucide icon name, e.g. TrendingUp, Palette, Code2, Target, Search, Share2")

    deliverables = models.JSONField(default=list, help_text="List of deliverable strings")
    business_benefits = models.JSONField(default=list, help_text="List of benefit strings")
    process_steps = models.JSONField(default=list, help_text="List of process step strings")
    featured_stats = models.JSONField(default=dict, blank=True,
                                      help_text="Object: {'label': '...', 'value': '...'}")

    image = models.URLField(max_length=500, blank=True, null=True,
                             verbose_name="Cover Image URL", help_text="Paste service image URL")
    image_url = models.URLField(max_length=500, blank=True, null=True,
                                help_text="Optional fallback image URL")

    featured = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Featured services are highlighted on the homepage and listings",
    )

    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
