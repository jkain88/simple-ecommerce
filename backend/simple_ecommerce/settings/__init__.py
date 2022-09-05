import os

from .base import *

PROJECT_ENVIRONMENT = os.getenv('PROJECT_ENVIRONMENT')

if PROJECT_ENVIRONMENT == 'prod':
  from .prod import *
elif PROJECT_ENVIRONMENT == 'dev':
  from .dev import *
elif PROJECT_ENVIRONMENT == 'local':
  from . local import *
