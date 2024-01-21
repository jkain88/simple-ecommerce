import os
from dotenv import load_dotenv

from .base import *

load_dotenv()

PROJECT_ENVIRONMENT = os.getenv("PROJECT_ENVIRONMENT")

print(PROJECT_ENVIRONMENT)
if PROJECT_ENVIRONMENT == "prod":
    from .prod import *
elif PROJECT_ENVIRONMENT == "dev":
    from .dev import *
elif PROJECT_ENVIRONMENT == "local":
    from .local import *
