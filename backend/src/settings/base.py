import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'admission_portal'),
        'USER': os.getenv('DB_USER', 'admin_user'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'secure_password123'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'OPTIONS': {
            'connect_timeout': 5,
            'client_encoding': 'UTF8',
        },
        'TEST': {
            'NAME': 'test_admission_portal',
        },
        'ATOMIC_REQUESTS': True,
        'CONN_MAX_AGE': 60,
    }
}

# Database connection pooling
CONN_MAX_AGE = 60  # 60 seconds
DATABASE_CONNECTION_POOLING = True

# Database performance settings
DJANGO_DB_LOGGER_ENABLE_FORMATTER = True
DJANGO_DB_LOGGER_DB_LEVEL = 'INFO'

# Cache settings for database queries
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': os.getenv('REDIS_URL', 'redis://localhost:6379/0'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'MAX_ENTRIES': 10000,
            'PARSER_CLASS': 'redis.connection.HiredisParser',
        }
    }
}