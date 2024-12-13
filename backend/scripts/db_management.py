import os
import sys
import django
from django.core.management import call_command
from django.db import connection
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

class DatabaseManager:
    def __init__(self):
        self.db_name = os.getenv('DB_NAME')
        self.db_user = os.getenv('DB_USER')
        self.db_password = os.getenv('DB_PASSWORD')
        self.db_host = os.getenv('DB_HOST')
        self.db_port = os.getenv('DB_PORT')

    def create_database(self):
        """Create the database if it doesn't exist"""
        try:
            conn = psycopg2.connect(
                dbname='postgres',
                user=self.db_user,
                password=self.db_password,
                host=self.db_host,
                port=self.db_port
            )
            conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
            cur = conn.cursor()
            
            # Check if database exists
            cur.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{self.db_name}'")
            exists = cur.fetchone()
            
            if not exists:
                cur.execute(f'CREATE DATABASE {self.db_name}')
                print(f'Database {self.db_name} created successfully')
            else:
                print(f'Database {self.db_name} already exists')
                
            cur.close()
            conn.close()
            
        except Exception as e:
            print(f'Error creating database: {str(e)}')
            sys.exit(1)

    def run_migrations(self):
        """Run database migrations"""
        try:
            call_command('migrate')
            print('Migrations completed successfully')
        except Exception as e:
            print(f'Error running migrations: {str(e)}')
            sys.exit(1)

    def create_superuser(self):
        """Create a superuser if it doesn't exist"""
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        try:
            if not User.objects.filter(is_superuser=True).exists():
                User.objects.create_superuser(
                    username='admin',
                    email='admin@example.com',
                    password='admin123',
                    phone_number='+1234567890'
                )
                print('Superuser created successfully')
            else:
                print('Superuser already exists')
        except Exception as e:
            print(f'Error creating superuser: {str(e)}')
            sys.exit(1)
