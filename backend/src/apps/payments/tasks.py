@shared_task
def process_successful_payment(payment_id):
    try:
        payment = Payment.objects.get(id=payment_id)
        
        # Update application status
        application = payment.application
        application.status = 'PAYMENT_VERIFIED'
        application.save()
        
        # Send confirmation email
        send_mail(
            subject='Payment Received',
            message=f'We have received your payment of {payment.amount} for application {application.application_number}.',
            from_email='noreply@admissionportal.com',
            recipient_list=[application.student.email]
        )
        
    except Exception as e:
        logger.error(f"Error processing payment {payment_id}: {str(e)}")
        raise