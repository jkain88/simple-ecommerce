# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "database_name",
        "USER": "username",
        "PASSWORD": "password",
        "HOST": "mysql",
        "PORT": "3306",
    }
}
