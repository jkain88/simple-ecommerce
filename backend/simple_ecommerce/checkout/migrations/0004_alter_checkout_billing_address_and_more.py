# Generated by Django 4.1 on 2024-01-18 06:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
        ('checkout', '0003_alter_checkout_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkout',
            name='billing_address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='core.address'),
        ),
        migrations.AlterField(
            model_name='checkout',
            name='shipping_address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='core.address'),
        ),
    ]
