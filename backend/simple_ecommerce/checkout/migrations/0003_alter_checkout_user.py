# Generated by Django 4.1 on 2024-01-18 05:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('checkout', '0002_remove_checkout_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkout',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='checkout', to=settings.AUTH_USER_MODEL),
        ),
    ]