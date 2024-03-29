# Generated by Django 4.1 on 2024-01-21 13:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_default', models.BooleanField(default=False)),
                ('contact_number', models.CharField(blank=True, max_length=30)),
                ('city_area', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=70)),
                ('postal_code', models.CharField(max_length=20)),
                ('province', models.CharField(max_length=70)),
                ('street', models.CharField(blank=True, max_length=100)),
                ('delivery_label', models.CharField(choices=[('home', 'Home'), ('office', 'Office')], default='home', max_length=15)),
                ('user', models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
