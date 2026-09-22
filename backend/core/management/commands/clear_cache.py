from django.core.management.base import BaseCommand
from django.core.cache import cache


class Command(BaseCommand):
    help = 'Clear all cached API responses and data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--prefix',
            type=str,
            default='',
            help='Only clear keys matching this prefix (e.g. "services", "articles")',
        )

    def handle(self, *args, **options):
        prefix = options.get('prefix', '')

        if hasattr(cache, 'keys'):
            # Redis / memcached — can iterate
            pattern = f"deft:{prefix}*" if prefix else "deft:*"
            keys = cache.keys(pattern)
            if keys:
                cache.delete_many(keys)
                self.stdout.write(self.style.SUCCESS(f'Cleared {len(keys)} cache key(s) matching "{pattern}"'))
            else:
                self.stdout.write(self.style.WARNING(f'No cache keys found matching "{pattern}"'))
        else:
            # LocMem cache — no key iteration, clear everything
            cache.clear()
            self.stdout.write(self.style.SUCCESS('Entire cache cleared'))
