# Remove number field from ServiceCategory, fix category column state

from django.db import migrations, models


def forwards(apps, schema_editor):
    conn = schema_editor.connection
    with conn.cursor() as cursor:
        # Drop the number column
        cursor.execute('ALTER TABLE services_servicecategory DROP COLUMN IF EXISTS number')


def backwards(apps, schema_editor):
    conn = schema_editor.connection
    with conn.cursor() as cursor:
        cursor.execute(
            'ALTER TABLE services_servicecategory ADD COLUMN number integer DEFAULT 1'
        )


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_servicecategory_alter_service_category'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='servicecategory',
            options={
                'ordering': ['order', 'title'],
                'verbose_name': 'Service Category',
                'verbose_name_plural': 'Service Categories',
            },
        ),
        migrations.RunPython(forwards, backwards),
    ]
