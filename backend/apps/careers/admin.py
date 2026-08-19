import csv
from django.contrib import admin
from django.http import HttpResponse
from django.utils.timezone import now
from unfold.admin import ModelAdmin
from unfold.decorators import action
from .models import JobPosition, JobApplication


@action(description="Download selected job applications as CSV", icon="download")
def export_applications_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type="text/csv; charset=utf-8")
    timestamp = now().strftime("%Y%m%d_%H%M%S")
    response["Content-Disposition"] = f'attachment; filename="job_applications_{timestamp}.csv"'

    writer = csv.writer(response)
    writer.writerow([
        "ID",
        "Full Name",
        "Job Title",
        "Department",
        "Email",
        "Phone",
        "LinkedIn URL",
        "Portfolio URL",
        "GitHub URL",
        "Resume Link",
        "Status",
        "Cover Letter",
        "Notes",
        "Created At",
        "Updated At",
    ])

    for app in queryset.select_related("job"):
        writer.writerow([
            app.id,
            app.full_name,
            app.job.title if app.job else "General Application",
            app.job.department if app.job else "",
            app.email,
            app.phone or "",
            app.linkedin_url or "",
            app.portfolio_url or "",
            app.github_url or "",
            app.resume_link or "",
            app.status,
            app.cover_letter or "",
            app.notes or "",
            app.created_at.strftime("%Y-%m-%d %H:%M:%S") if app.created_at else "",
            app.updated_at.strftime("%Y-%m-%d %H:%M:%S") if app.updated_at else "",
        ])

    return response


@admin.register(JobPosition)
class JobPositionAdmin(ModelAdmin):
    list_display = ('title', 'department', 'location', 'job_type', 'experience_level', 'is_active', 'featured', 'order')
    list_filter = ('department', 'job_type', 'is_active', 'featured')
    search_fields = ('title', 'overview', 'department', 'location')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_active', 'featured', 'order')


@admin.register(JobApplication)
class JobApplicationAdmin(ModelAdmin):
    list_display = ('full_name', 'job', 'email', 'phone', 'status', 'created_at')
    list_filter = ('status', 'job__department', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'notes', 'cover_letter')
    list_editable = ('status',)
    readonly_fields = ('created_at', 'updated_at')
    actions = [export_applications_csv]

    def has_add_permission(self, request):
        return False
