from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer
from .services import RazorpayService
from django.db import transaction

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsOwnerOrStaff]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Payment.objects.all()
        return Payment.objects.filter(application__student=self.request.user)

    @action(detail=False, methods=['post'])
    def create_order(self, request):
        application_id = request.data.get('application_id')
        amount = request.data.get('amount')

        try:
            razorpay_service = RazorpayService()
            order = razorpay_service.create_order(amount)

            with transaction.atomic():
                payment = Payment.objects.create(
                    application_id=application_id,
                    amount=amount,
                    razorpay_order_id=order['id']
                )

            return Response({
                'payment_id': payment.id,
                'order_id': order['id'],
                'amount': amount,
                'key': settings.RAZORPAY_KEY_ID
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def verify_payment(self, request):
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        signature = request.data.get('razorpay_signature')

        try:
            razorpay_service = RazorpayService()
            is_valid = razorpay_service.verify_payment(payment_id, order_id, signature)

            if is_valid:
                payment = Payment.objects.get(razorpay_order_id=order_id)
                payment.status = 'SUCCESS'
                payment.razorpay_payment_id = payment_id
                payment.save()

                # Trigger async task for payment processing
                from .tasks import process_successful_payment
                process_successful_payment.delay(payment.id)

                return Response({'status': 'Payment verified successfully'})
            else:
                return Response(
                    {'error': 'Invalid payment signature'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )