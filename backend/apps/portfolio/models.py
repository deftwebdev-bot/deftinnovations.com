from django.db import models
from django.utils.text import slugify

CATEGORY_CHOICES = [
    ("Branding", "Branding"),
    ("Web Development", "Web Development"),
    ("Digital Marketing", "Digital Marketing"),
    ("Performance Marketing", "Performance Marketing"),
    ("Social Media", "Social Media"),
    ("Creative", "Creative"),
]

class Project(models.Model):
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    title = models.CharField(max_length=255)
    client = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Web Development")
    industry = models.CharField(max_length=150, help_text="e.g. Fintech & Private Wealth")
    
    summary = models.TextField(help_text="Executive summary of the case study")
    challenge = models.TextField(help_text="The client's initial challenges and friction points")
    solution = models.TextField(help_text="Our strategy, execution, and deliverables")
    
    # Structured JSON data
    results = models.JSONField(default=list, help_text="List of objects: [{'metric': '0.35s', 'label': 'Page Load Time'}]")
    services_provided = models.JSONField(default=list, help_text="List of strings: ['Web Development', 'Branding']")
    technologies_used = models.JSONField(default=list, help_text="List of strings: ['Next.js', 'Tailwind']")
    
    # Media
    image_url = models.URLField(max_length=500, help_text="Primary hero / cover image")
    gallery_images = models.JSONField(default=list, blank=True, help_text="List of image URLs for project gallery")
    
    year = models.CharField(max_length=20, default="2025")
    featured = models.BooleanField(default=False, db_index=True)
    order = models.PositiveIntegerField(default=0, help_text="Order in lists")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Project Case Study'
        verbose_name_plural = 'Project Case Studies'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.client})"
