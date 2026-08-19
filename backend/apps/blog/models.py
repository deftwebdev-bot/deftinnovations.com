from django.db import models
from django.utils.text import slugify

CATEGORY_CHOICES = [
    ("Digital Marketing", "Digital Marketing"),
    ("Branding", "Branding"),
    ("Web Development", "Web Development"),
    ("SEO", "SEO"),
    ("Social Media", "Social Media"),
    ("Business Growth", "Business Growth"),
    ("Technology", "Technology"),
]

class Article(models.Model):
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    title = models.CharField(max_length=255)
    excerpt = models.TextField(help_text="Short summary shown on cards and SEO")
    content = models.TextField(help_text="Markdown or rich text article body")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Technology")
    
    # Author information
    author_name = models.CharField(max_length=120, default="Marcus Vance")
    author_role = models.CharField(max_length=120, default="Editorial Team")
    author_avatar = models.URLField(max_length=500, blank=True)
    
    # Metadata & Media
    published_at = models.CharField(max_length=50, help_text="e.g. August 10, 2025")
    read_time = models.CharField(max_length=30, default="5 min read")
    image_url = models.URLField(max_length=500, help_text="Cover image URL or hosted asset")
    featured = models.BooleanField(default=False, db_index=True)
    tags = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
