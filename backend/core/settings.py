import os
from pathlib import Path
import environ


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
env = environ.Env(
    DEBUG=(bool, True),
    SECRET_KEY=(str, 'django-insecure-deft-innovations-secret-key-replace-in-prod'),
    DATABASE_URL=(str, f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
    ALLOWED_HOSTS=(list, ['*']),
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
    
    # Local Apps
    'apps.blog',
    'apps.portfolio',
    'apps.services',
    'apps.leads',
    'apps.company',
    'apps.careers',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

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


