from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = "core"
    default_auto_field = "django.db.models.BigAutoField"

    def ready(self):
        # Register cache-invalidation signals for all CMS models.
        # Import here to avoid circular imports during startup.
        try:
            from core.signals import connect_all
            connect_all()
        except Exception:
            pass  # Never let signal registration crash the server startup
