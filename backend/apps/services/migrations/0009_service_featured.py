# Generated manually — add featured flag to Service
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0008_remove_servicecategory_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='featured',
            field=models.BooleanField(
                db_index=True,
                default=False,
                help_text='Featured services are highlighted on the homepage and listings',
            ),
        ),
    ]
