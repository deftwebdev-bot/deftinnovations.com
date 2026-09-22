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
    video_file = models.URLField(max_length=500, blank=True, null=True, verbose_name="Hero Video URL", help_text="Paste a direct MP4 link, or a Google Drive sharing link. Do NOT use YouTube/Vimeo embed links.")
    photo = models.URLField(max_length=500, blank=True, null=True, verbose_name="Background Image URL", help_text="Paste background image URL")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Hero Slide'
        verbose_name_plural = 'Hero Slides / Content'

    def __str__(self):
        return f"Hero: {self.headline_primary} (Active: {self.is_active})"


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
    logo = models.URLField(max_length=500, blank=True, null=True, verbose_name="Brand Logo URL", help_text="Paste brand logo image URL")
    logo_url = models.URLField(max_length=500, blank=True, help_text="Optional logo image URL")
    website_url = models.URLField(max_length=500, blank=True, help_text="Optional brand website URL")
    is_featured = models.BooleanField(default=False, db_index=True, help_text="Show on landing page clients section")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Trusted Brand / Client'
        verbose_name_plural = 'Trusted Brands / Clients'

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    photo = models.URLField(max_length=500, blank=True, null=True, verbose_name="Photo URL", help_text="Paste team member photo URL")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'

    def __str__(self):
        return f"{self.name} - {self.role}"


class CultureGallery(models.Model):
    photo = models.URLField(max_length=500, blank=True, null=True, verbose_name="Photo URL", help_text="Paste gallery image URL")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Gallery Photo'
        verbose_name_plural = 'Gallery (Life at Deft Collage)'

    def __str__(self):
        return f"Gallery Photo #{self.id}"

class Testimonial(models.Model):
    quote = models.TextField()
    author = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    logo_text = models.CharField(max_length=100, default="CLIENT")
    metric = models.CharField(max_length=50, blank=True, help_text="e.g. +320%")
    metric_label = models.CharField(max_length=100, blank=True, help_text="e.g. Lead Conversion Growth")
    image_url = models.URLField(max_length=500, blank=True,
                                verbose_name="Profile Photo URL",
                                help_text="Profile/cover photo URL (e.g. Unsplash, or an uploaded media path like testimonials/jane.jpg)")
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
