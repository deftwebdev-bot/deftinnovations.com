import csv
from django.contrib import admin
from django.http import HttpResponse
from django.utils.timezone import now
from unfold.admin import ModelAdmin
from unfold.decorators import action
from .models import ContactLead


@action(description="Download selected leads as CSV", icon="download")
def export_leads_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type="text/csv; charset=utf-8")
    timestamp = now().strftime("%Y%m%d_%H%M%S")
    response["Content-Disposition"] = f'attachment; filename="contact_leads_{timestamp}.csv"'

    writer = csv.writer(response)
    writer.writerow([
        "ID",
        "Name",
        "Company",
        "Email",
        "Phone",
        "Service",
        "Status",
        "Message",
        "IP Address",
        "Created At",
        "Updated At",
    ])

    for lead in queryset:
        writer.writerow([
            lead.id,
            lead.name,
            lead.company or "",
            lead.email,
            lead.phone or "",
            lead.service or "",
            lead.status,
            lead.message,
            lead.ip_address or "",
            lead.created_at.strftime("%Y-%m-%d %H:%M:%S") if lead.created_at else "",
            lead.updated_at.strftime("%Y-%m-%d %H:%M:%S") if lead.updated_at else "",
        ])

    return response


@admin.register(ContactLead)
class ContactLeadAdmin(ModelAdmin):
    list_display = ('name', 'company', 'email', 'phone', 'service', 'status', 'created_at')
    list_filter = ('status', 'service', 'created_at')
    search_fields = ('name', 'company', 'email', 'phone', 'message')
    list_editable = ('status',)
    readonly_fields = ('created_at', 'updated_at', 'ip_address')
    actions = [export_leads_csv]

    def has_add_permission(self, request):
        return False
