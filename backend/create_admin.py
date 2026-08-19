import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User

def create_admin():
    username = os.environ.get("ADMIN_USER", "admin")
    email = os.environ.get("ADMIN_EMAIL", "admin@deftinnovations.com")
    password = os.environ.get("ADMIN_PASS", "admin123")

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, email=email, password=password)
        print(f"✅ Superuser created successfully:")
        print(f"   Username: {username}")
        print(f"   Password: {password}")
        print(f"   Login URL: http://localhost:8000/admin")
    else:
        print(f"ℹ️ User '{username}' already exists.")

if __name__ == '__main__':
    create_admin()
