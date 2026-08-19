from django.db import models

LEAD_STATUS_CHOICES = [
    ("New", "New"),
    ("Contacted", "Contacted"),
    ("In Discussion", "In Discussion"),
    ("Proposal Sent", "Proposal Sent"),
    ("Won / Converted", "Won / Converted"),
    ("Closed / Lost", "Closed / Lost"),
]

class ContactLead(models.Model):
    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50, blank=True)
    budget = models.CharField(max_length=100, blank=True)
    service = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    
    status = models.CharField(max_length=50, choices=LEAD_STATUS_CHOICES, default="New")
    notes = models.TextField(blank=True, help_text="Internal notes for sales team")
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Lead'
        verbose_name_plural = 'Contact Leads'

    def __str__(self):
        return f"{self.name} ({self.company or self.email}) - {self.status}"
