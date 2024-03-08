from model_utils.models import TimeStampedModel
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

from .choices import Sex


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_staff=False, **extra_fields):
        """Create a user instance with the given email and password."""
        email = UserManager.normalize_email(email)
        extra_fields.pop("username", None)

        user = self.model(email=email, is_staff=is_staff, **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(
            email, password, is_superuser=True, is_staff=True, **extra_fields
        )


class User(AbstractBaseUser, TimeStampedModel):
    age = models.PositiveIntegerField(null=True)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=100, blank=True)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    contact_number = models.CharField(max_length=30, blank=True)
    sex = models.CharField(
        choices=Sex.CHOICES, default=Sex.MALE, max_length=10, blank=True
    )
    birthday = models.DateField(null=True, blank=True)
    objects = UserManager()

    USERNAME_FIELD = "email"
