from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class User(AbstractUser, BaseModel):
    ROLES = [
        ('ADMIN', 'Administrator'),
        ('STAFF', 'Staff'),
        ('STUDENT', 'Student')
    ]
    
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLES, default='STUDENT')
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$')
    phone_number = models.CharField(validators=[phone_regex], max_length=17)
    is_verified = models.BooleanField(default=False)

    class Meta:
        db_table = 'users'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['phone_number']),
        ]