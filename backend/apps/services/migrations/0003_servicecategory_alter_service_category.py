# Manually written migration: convert Service.category from CharField to ForeignKey via ServiceCategory

from django.db import migrations, models


def forwards(apps, schema_editor):
    """Read existing category text values, create ServiceCategory rows, wire FK, drop old column."""
    conn = schema_editor.connection

    with conn.cursor() as cursor:
        # 1. Get distinct category values
        cursor.execute(
            "SELECT DISTINCT category FROM services_service "
            "WHERE category IS NOT NULL AND category != ''"
        )
        categories = [row[0] for row in cursor.fetchall()]

        # 2. Insert ServiceCategory rows with unique slugs
        cat_map = {}
        for idx, title in enumerate(sorted(categories), start=1):
            slug = title.lower().replace(' ', '-').replace('&', 'and')
            base_slug = slug
            suffix = 2
            while slug in cat_map.values():
                slug = f"{base_slug}-{suffix}"
                suffix += 1

            cursor.execute(
                'INSERT INTO services_servicecategory '
                '(slug, title, number, icon_name, description, "order", is_active, created_at, updated_at) '
                'VALUES (%s, %s, %s, %s, %s, %s, true, NOW(), NOW()) '
                'RETURNING id',
                [slug, title, idx, 'TrendingUp', '', idx]
            )
            cat_id = cursor.fetchone()[0]
            cat_map[title] = cat_id

        # 3. Add category_id column (nullable FK)
        cursor.execute(
            "ALTER TABLE services_service "
            "ADD COLUMN category_id bigint NULL "
            "REFERENCES services_servicecategory(id) ON DELETE CASCADE"
        )

        # 4. Populate FK from old text values
        for title, cat_id in cat_map.items():
            cursor.execute(
                "UPDATE services_service SET category_id = %s WHERE category = %s",
                [cat_id, title]
            )

        # 5. Drop old text column
        cursor.execute("ALTER TABLE services_service DROP COLUMN category")


def backwards(apps, schema_editor):
    """Reverse: recreate text column from FK, drop FK, drop ServiceCategory."""
    conn = schema_editor.connection

    with conn.cursor() as cursor:
        cursor.execute(
            "ALTER TABLE services_service ADD COLUMN category varchar(100) DEFAULT ''"
        )
        cursor.execute(
            "UPDATE services_service s SET category = sc.title "
            "FROM services_servicecategory sc WHERE s.category_id = sc.id"
        )
        cursor.execute("ALTER TABLE services_service DROP COLUMN category_id")
        cursor.execute("DROP TABLE IF EXISTS services_servicecategory")


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_service_image_service_image_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('title', models.CharField(max_length=255)),
                ('number', models.PositiveIntegerField(default=1)),
                ('icon_name', models.CharField(default='TrendingUp', max_length=50)),
                ('description', models.TextField(blank=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Service Category',
                'verbose_name_plural': 'Service Categories',
                'ordering': ['order', 'number'],
            },
        ),
        migrations.RunPython(forwards, backwards),
    ]
