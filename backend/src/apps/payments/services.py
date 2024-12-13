import razorpay
from django.conf import settings
from .models import Payment
from .exceptions import PaymentError

class RazorpayService:
    def __init__(self):
        self.client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

    def create_order(self, amount, currency="INR"):
        try:
            order_data = {
                'amount': int(amount * 100),  # Convert to paise
                'currency': currency,
                'payment_capture': 1
            }
            order = self.client.order.create(data=order_data)
            return order
        except Exception as e:
            raise PaymentError(f"Error creating Razorpay order: {str(e)}")

    def verify_payment(self, payment_id, order_id, signature):
        try:
            params_dict = {
                'razorpay_payment_id': payment_id,
                'razorpay_order_id': order_id,
                'razorpay_signature': signature
            }
            self.client.utility.verify_payment_signature(params_dict)
            return True
        except Exception:
            return False