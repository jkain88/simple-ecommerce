# Generated by Django 4.1 on 2024-01-17 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_alter_user_sex'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='contact_number',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
