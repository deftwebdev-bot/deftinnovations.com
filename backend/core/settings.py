import os
from pathlib import Path
import environ


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
env = environ.Env(
    # Production-safe defaults: the server must be explicitly configured via .env
    DEBUG=(bool, False),
    SECRET_KEY=(str, ''),
    DATABASE_URL=(str, f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
    ALLOWED_HOSTS=(list, []),
    SECURE_SSL_REDIRECT=(bool, False),
    SECURE_HSTS_SECONDS=(int, 31536000),
    CSRF_TRUSTED_ORIGINS=(list, [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://deftinnovations.com',
        'https://www.deftinnovations.com',
    ]),
    CORS_ALLOWED_ORIGINS=(list, [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://deftinnovations.com',
        'https://www.deftinnovations.com',
    ]),
)

# Read .env if it exists
env_file = BASE_DIR / '.env'
if env_file.exists():
    environ.Env.read_env(env_file)

SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')
ALLOWED_HOSTS = env('ALLOWED_HOSTS')

# ─── Fail fast on insecure production config ──────────────────
if not DEBUG:
    from django.core.exceptions import ImproperlyConfigured

    if not SECRET_KEY or 'insecure' in SECRET_KEY or 'change-this' in SECRET_KEY:
        raise ImproperlyConfigured(
            "SECRET_KEY must be set to a strong random value in production. "
            "Generate one with: python -c \"from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())\""
        )
    if not ALLOWED_HOSTS:
        raise ImproperlyConfigured(
            "ALLOWED_HOSTS must list your production domain(s), e.g. "
            "ALLOWED_HOSTS=deftinnovations.com,www.deftinnovations.com"
        )
    if not env('CORS_ALLOWED_ORIGINS'):
        raise ImproperlyConfigured(
            "CORS_ALLOWED_ORIGINS must list your frontend origin(s) in production."
        )

# Application definition
INSTALLED_APPS = [
    'unfold',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # 3rd party
    'corsheaders',
    'whitenoise.runserver_nostatic',
    
    # Local Apps
    'core',
    'apps.blog',
    'apps.portfolio',
    'apps.services',
    'apps.leads',
    'apps.company',
    'apps.careers',
]

if DEBUG:
    INSTALLED_APPS.insert(0, 'debug_toolbar')

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

if DEBUG:
    MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'
ASGI_APPLICATION = 'core.asgi.application'

# Database Configuration (Defaults to Postgres when DATABASE_URL is set, or local fallback)
DATABASES = {
    'default': env.db('DATABASE_URL')
}
# Keep DB connections open across requests (ignored by SQLite).
DATABASES['default']['CONN_MAX_AGE'] = 600

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

# Media files (Uploaded images / assets)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS configuration
CORS_ALLOW_ALL_ORIGINS = DEBUG  # Allow all in local development
CORS_ALLOWED_ORIGINS = env('CORS_ALLOWED_ORIGINS')
CORS_ALLOW_CREDENTIALS = True

# Email configuration
EMAIL_BACKEND = env('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='hello@deftinnovations.com')

# Unfold Admin Custom Styling (Tailwind-based modern design)
UNFOLD = {
    "SITE_TITLE": "Deft Innovations Admin",
    "SITE_HEADER": "Deft Innovations",
    "SITE_LOGO": "/static/Deft%20logo%20black.png",
    "SITE_ICON": "/static/icon-light.svg",
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/png",
            "href": "/static/favicon.png",
        },
    ],
    "SHOW_HISTORY": True,
    "SHOW_SIDEBAR": True,
    "BORDER_RADIUS": "12px",
    "THEME": "light",  # Set light mode by default for high readability
    "DASHBOARD_CALLBACK": "core.dashboard.dashboard_callback",
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,  # Hide massive listing, use clean groups instead
        "navigation": [
            {
                "title": "Leads & Inquiries",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Contact Leads",
                        "link": "/admin/leads/contactlead/",
                        "icon": "chat",
                    },
                ],
            },
            {
                "title": "Careers & Talent",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Job Positions",
                        "link": "/admin/careers/jobposition/",
                        "icon": "work",
                    },
                    {
                        "title": "Job Applications",
                        "link": "/admin/careers/jobapplication/",
                        "icon": "assignment_ind",
                    },
                ],
            },
            {
                "title": "Content Management",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Articles / Blog",
                        "link": "/admin/blog/article/",
                        "icon": "article",
                    },
                    {
                        "title": "Portfolio / Projects",
                        "link": "/admin/portfolio/project/",
                        "icon": "folder_special",
                    },
                    {
                        "title": "Services",
                        "link": "/admin/services/service/",
                        "icon": "design_services",
                    },
                ],
            },
            {
                "title": "Company settings",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Hero Section Content",
                        "link": "/admin/company/herocontent/",
                        "icon": "tune",
                    },
                    {
                        "title": "Trusted Brands",
                        "link": "/admin/company/trustedbrand/",
                        "icon": "business",
                    },
                    {
                        "title": "Team Members",
                        "link": "/admin/company/teammember/",
                        "icon": "groups",
                    },
                    {
                        "title": "Gallery (Life at Deft)",
                        "link": "/admin/company/culturegallery/",
                        "icon": "photo_library",
                    },
                    {
                        "title": "Testimonials",
                        "link": "/admin/company/testimonial/",
                        "icon": "reviews",
                    },
                    {
                        "title": "Trust Statistics",
                        "link": "/admin/company/truststat/",
                        "icon": "query_stats",
                    },
                ],
            },
            {
                "title": "User Security",
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": "Users",
                        "link": "/admin/auth/user/",
                        "icon": "people",
                    },
                    {
                        "title": "Groups",
                        "link": "/admin/auth/group/",
                        "icon": "admin_panel_settings",
                    },
                ],
            },
        ],
    },
}

# ─── Django Debug Toolbar ──────────────────────────────────────
if DEBUG:
    INTERNAL_IPS = env.list('INTERNAL_IPS', default=['127.0.0.1', 'localhost', '10.0.2.2'])

    def show_toolbar(request):
        # Never run toolbar on API, media, or static requests to ensure sub-millisecond response
        path = request.path_info
        if path.startswith('/api/') or path.startswith('/media/') or path.startswith('/static/'):
            return False
        # Do not run for non-HTML responses
        accept = request.headers.get('Accept', '')
        if 'text/html' not in accept and '*/*' not in accept:
            return False
        remote_addr = request.META.get('REMOTE_ADDR')
        return remote_addr in INTERNAL_IPS or DEBUG

    DEBUG_TOOLBAR_CONFIG = {
        'SHOW_TOOLBAR_CALLBACK': show_toolbar,
        'RESULTS_CACHE_SIZE': 20,
    }

# ─── Django Ninja API config ──────────────────────────────────
# Anonymous rate limits (per IP) for the public API. The global 'anon' rate is
# generous because the Next.js server itself fetches the API server-side;
# the POST form endpoints get their own tight limits against spam.
NINJA_DEFAULT_THROTTLE_RATES = {
    "anon": "300/m",
    "leads": "10/m",
    "careers": "10/m",
}

# ─── Django Cache Framework (Django Core Cache) ───────────────
# Local-memory cache for development; switch to Redis in production
if DEBUG or not env('REDIS_URL', default=''):
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': 'deft-core-cache',
            'TIMEOUT': 3600,  # 1 hour default
            'OPTIONS': {
                'MAX_ENTRIES': 1000,
            }
        }
    }
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': env('REDIS_URL'),
            'TIMEOUT': 3600,
            'OPTIONS': {
                'MAX_ENTRIES': 2000,
            }
        }
    }

# ─── Security Headers ─────────────────────────────────────────
X_FRAME_OPTIONS = 'DENY'
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'

# Behind a reverse proxy (nginx/Cloudflare), trust X-Forwarded-Proto so
# request.is_secure() — and therefore the secure-cookie/SSL-redirect logic — works.
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS')

if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = env('SECURE_SSL_REDIRECT')
    _hsts = env('SECURE_HSTS_SECONDS')
    if _hsts > 0:
        SECURE_HSTS_SECONDS = _hsts
        SECURE_HSTS_INCLUDE_SUBDOMAINS = True
        SECURE_HSTS_PRELOAD = True

# ─── Static files via WhiteNoise (gzip/brotli + cache headers) ─
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedStaticFilesStorage"},
}

