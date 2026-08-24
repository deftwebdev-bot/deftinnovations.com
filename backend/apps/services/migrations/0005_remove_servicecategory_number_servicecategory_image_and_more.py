from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0004_alter_servicecategory_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicecategory',
            name='image',
            field=models.ImageField(blank=True, help_text='Upload category cover image', null=True, upload_to='services/categories/', verbose_name='Category Image'),
        ),
        migrations.AddField(
            model_name='servicecategory',
            name='image_url',
            field=models.URLField(blank=True, help_text='Optional fallback image URL', max_length=500, null=True),
        ),
    ]
