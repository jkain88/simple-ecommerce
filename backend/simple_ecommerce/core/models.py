from django.db import models


class PublishableModel(models.Model):
    is_published = models.BooleanField(default=True)

    class Meta:
        abstract = True
