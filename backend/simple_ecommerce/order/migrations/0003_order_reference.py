# Generated by Django 4.1 on 2024-01-29 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_alter_orderline_product_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='reference',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
