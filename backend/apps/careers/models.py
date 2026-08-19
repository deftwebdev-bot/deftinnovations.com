from django.db import models
from django.utils.text import slugify

DEPARTMENT_CHOICES = [
    ("Engineering", "Engineering"),
    ("Design & Creative", "Design & Creative"),
    ("Performance Marketing", "Performance Marketing"),
    ("SEO & Content", "SEO & Content"),
    ("Strategy & Operations", "Strategy & Operations"),
]

JOB_TYPE_CHOICES = [
    ("Full-time", "Full-time"),
    ("Contract", "Contract"),
    ("Part-time", "Part-time"),
    ("Freelance", "Freelance"),
]

APPLICATION_STATUS_CHOICES = [
    ("New", "New"),
    ("In Review", "In Review"),
    ("Interview Scheduled", "Interview Scheduled"),
    ("Offer Extended", "Offer Extended"),
    ("Hired", "Hired"),
    ("Rejected", "Rejected"),
    ("Archived", "Archived"),
]

class JobPosition(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES, default="Engineering")
    location = models.CharField(max_length=150, default="Remote (Global)")
    job_type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES, default="Full-time")
    experience_level = models.CharField(max_length=100, default="Senior (4+ yrs)")
    salary_range = models.CharField(max_length=100, default="$90,000 — $130,000 / yr")
    
    overview = models.TextField(help_text="Role summary and impact at Deft Innovations")
    responsibilities = models.JSONField(default=list, help_text="List of key responsibilities")
    requirements = models.JSONField(default=list, help_text="List of skills and qualifications")
    perks = models.JSONField(default=list, help_text="List of role perks & benefits", blank=True)
    
    featured = models.BooleanField(default=False, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True, help_text="Uncheck to close the job posting")
    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Job Position'
        verbose_name_plural = 'Job Positions'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.department}) - {'Active' if self.is_active else 'Closed'}"

class JobApplication(models.Model):
    job = models.ForeignKey(JobPosition, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications')
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50, blank=True)
    linkedin_url = models.URLField(max_length=500, blank=True)
    portfolio_url = models.URLField(max_length=500, blank=True)
    github_url = models.URLField(max_length=500, blank=True)
    resume_link = models.URLField(max_length=500, help_text="Link to Resume / CV (Google Drive, Dropbox, Notion, etc.)")
    cover_letter = models.TextField(blank=True, help_text="Candidate cover note or intro")
    
    status = models.CharField(max_length=50, choices=APPLICATION_STATUS_CHOICES, default="New")
    notes = models.TextField(blank=True, help_text="Internal notes for hiring team")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'

    def __str__(self):
        job_title = self.job.title if self.job else "General Application"
        return f"{self.full_name} — {job_title} ({self.status})"
