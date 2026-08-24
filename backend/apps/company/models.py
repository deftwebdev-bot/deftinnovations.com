from django.db import models

class HeroContent(models.Model):
    badge_text = models.CharField(max_length=255, default="Creative Technology & Marketing Agency — Est. 2020")
    headline_primary = models.CharField(max_length=255, default="Building Brands That Move")
    headline_secondary = models.CharField(max_length=255, default="Businesses Forward.")
    subheadline = models.TextField(default="Strategy, creativity, technology & performance marketing — unified into one growth engine for ambitious businesses.")
    primary_cta_text = models.CharField(max_length=100, default="Start a Project")
    primary_cta_link = models.CharField(max_length=255, default="/contact")
    secondary_cta_text = models.CharField(max_length=100, default="View Work")
    secondary_cta_link = models.CharField(max_length=255, default="/portfolio")
    video_file = models.FileField(upload_to="hero/videos/", blank=True, null=True, verbose_name="Hero Video", help_text="Upload an MP4 video for this hero slide")
    photo = models.ImageField(upload_to="hero/", blank=True, null=True, verbose_name="Background Image", help_text="Upload custom background image")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Hero Slide'
        verbose_name_plural = 'Hero Slides / Content'

    def __str__(self):
        return f"Hero: {self.headline_primary} (Active: {self.is_active})"

    @property
    def media_url(self):
        if self.photo and hasattr(self.photo, 'url'):
            return self.photo.url
        return ""

    @property
    def video_file_url(self):
        if self.video_file and hasattr(self.video_file, 'url'):
            return self.video_file.url
        return ""

INDUSTRY_CHOICES = [
    ("Fintech", "Fintech"),
    ("E-Commerce", "E-Commerce"),
    ("Healthcare", "Healthcare"),
    ("Technology", "Technology"),
    ("Real Estate", "Real Estate"),
    ("Automotive", "Automotive"),
    ("Education", "Education"),
    ("Hospitality", "Hospitality"),
    ("Retail", "Retail"),
    ("Media & Entertainment", "Media & Entertainment"),
    ("SaaS", "SaaS"),
    ("Non-Profit", "Non-Profit"),
]

class TrustedBrand(models.Model):
    name = models.CharField(max_length=150, help_text="Brand or Client name (e.g. NEXUS GLOBAL CAPITAL)")
    industry = models.CharField(max_length=100, choices=INDUSTRY_CHOICES, blank=True, help_text="Client industry for filtering")
    logo = models.ImageField(upload_to="brands/", blank=True, null=True, verbose_name="Brand Logo", help_text="Upload brand logo file from your system")
    logo_url = models.URLField(max_length=500, blank=True, help_text="Optional logo image URL")
    website_url = models.URLField(max_length=500, blank=True, help_text="Optional brand website URL")
    is_featured = models.BooleanField(default=False, db_index=True, help_text="Show on landing page clients section")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Trusted Brand / Client'
        verbose_name_plural = 'Trusted Brands / Clients'

    def __str__(self):
        return self.name

    @property
    def logo_src(self):
        if self.logo and hasattr(self.logo, 'url'):
            return self.logo.url
        return self.logo_url or ""

class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    photo = models.ImageField(upload_to="team/", blank=True, null=True, verbose_name="Photo", help_text="Upload a photo from your computer")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'

    def __str__(self):
        return f"{self.name} - {self.role}"

    @property
    def photo_url(self):
        if self.photo and hasattr(self.photo, 'url'):
            return self.photo.url
        return ""

class CultureGallery(models.Model):
    photo = models.ImageField(upload_to="gallery/", verbose_name="Photo", help_text="Upload gallery image")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Gallery Photo'
        verbose_name_plural = 'Gallery (Life at Deft Collage)'

    def __str__(self):
        if self.photo:
            return f"Gallery Photo #{self.id} ({self.photo.name})"
        return f"Gallery Photo #{self.id}"

    @property
    def photo_url(self):
        if self.photo and hasattr(self.photo, 'url'):
            return self.photo.url
        return ""

class Testimonial(models.Model):
    quote = models.TextField()
    author = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    logo_text = models.CharField(max_length=100, default="CLIENT")
    metric = models.CharField(max_length=50, blank=True, help_text="e.g. +320%")
    metric_label = models.CharField(max_length=100, blank=True, help_text="e.g. Lead Conversion Growth")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'author']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'

    def __str__(self):
        return f"{self.author} ({self.company})"

class TrustStat(models.Model):
    value = models.CharField(max_length=50, help_text="e.g. 150+")
    label = models.CharField(max_length=150, help_text="e.g. Projects Delivered Globally")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Trust Statistic'
        verbose_name_plural = 'Trust Statistics'

    def __str__(self):
        return f"{self.value} - {self.label}"
