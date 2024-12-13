# scripts/backup_db.py
import os
import subprocess
from datetime import datetime

class DatabaseBackup:
    def __init__(self):
        self.db_name = os.getenv('DB_NAME')
        self.db_user = os.getenv('DB_USER')
        self.db_password = os.getenv('DB_PASSWORD')
        self.db_host = os.getenv('DB_HOST')
        self.db_port = os.getenv('DB_PORT')
        self.backup_dir = 'backups'

    def create_backup(self):
        """Create a database backup"""
        if not os.path.exists(self.backup_dir):
            os.makedirs(self.backup_dir)

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_file = f'{self.backup_dir}/backup_{timestamp}.sql'

        try:
            subprocess.run([
                'pg_dump',
                '-h', self.db_host,
                '-p', self.db_port,
                '-U', self.db_user,
                '-F', 'c',  # Custom format
                '-b',  # Include large objects
                '-v',  # Verbose
                '-f', backup_file,
                self.db_name
            ], env={'PGPASSWORD': self.db_password})
            
            print(f'Backup created successfully: {backup_file}')
            
        except Exception as e:
            print(f'Error creating backup: {str(e)}')

    def restore_backup(self, backup_file):
        """Restore database from backup"""
        try:
            subprocess.run([
                'pg_restore',
                '-h', self.db_host,
                '-p', self.db_port,
                '-U', self.db_user,
                '-d', self.db_name,
                '-v',
                backup_file
            ], env={'PGPASSWORD': self.db_password})
            
            print('Database restored successfully')
            
        except Exception as e:
            print(f'Error restoring backup: {str(e)}')

if __name__ == '__main__':
    backup = DatabaseBackup()
    backup.create_backup()