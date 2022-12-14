from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from model_utils.models import TimeStampedModel

from .choices import AddressType, Sex


class UserManager(BaseUserManager):
    def create_user(
        self, email, password=None, is_staff=False, **extra_fields
    ):
        """Create a user instance with the given email and password."""
        email = UserManager.normalize_email(email)
        extra_fields.pop("username", None)

        user = self.model(
            email=email, is_staff=is_staff, **extra_fields
        )
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(
            email, password, is_superuser=True, is_staff=True, **extra_fields
        )


class User(AbstractBaseUser):
    age = models.PositiveIntegerField(null=True)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=100, blank=True)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    sex = models.CharField(choices=Sex.CHOICES, max_length=10, blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'


class Address(TimeStampedModel):
    address_type = models.CharField(max_length=15, choices=AddressType.CHOICES)
    city_area = models.CharField(max_length=100)
    city = models.CharField(max_length=70)
    postal_code = models.CharField(max_length=20)
    province = models.CharField(max_length=70)
    street = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
