from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.production')

app = Celery('admission_portal')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# apps/admissions/tasks.py
from celery import shared_task
from django.core.mail import send_mail
from .models import Application

@shared_task
def process_application_submission(application_id):
    try:
        application = Application.objects.get(id=application_id)
        
        # Send email notification
        send_mail(
            subject='Application Submitted Successfully',
            message=f'Your application {application.application_number} has been submitted successfully.',
            from_email='noreply@admissionportal.com',
            recipient_list=[application.student.email]
        )
        
        # Additional processing tasks
        # ...
        
    except Exception as e:
        # Log error
        logger.error(f"Error processing application {application_id}: {str(e)}")
        raise