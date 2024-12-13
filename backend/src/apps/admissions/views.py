# apps/admissions/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.utils import timezone
from django_filters import rest_framework as filters
from .serializers import *
from .models import *

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['is_active']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['department', 'is_active']
    search_fields = ['name', 'code']

    @action(detail=True, methods=['get'])
    def check_eligibility(self, request, pk=None):
        course = self.get_object()
        percentage = request.query_params.get('percentage', 0)
        try:
            is_eligible = float(percentage) >= course.minimum_percentage
            return Response({
                'is_eligible': is_eligible,
                'minimum_percentage': course.minimum_percentage
            })
        except ValueError:
            return Response({'error': 'Invalid percentage'}, 
                          status=status.HTTP_400_BAD_REQUEST)

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['status', 'academic_year']
    search_fields = ['application_no', 'full_name']

    def get_queryset(self):
        if self.request.user.role in ['ADMIN', 'STAFF']:
            return Application.objects.all()
        return Application.objects.filter(student=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return ApplicationListSerializer
        return ApplicationSerializer

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        application = self.get_object()
        if application.status != 'DRAFT':
            return Response(
                {'error': 'Only draft applications can be submitted'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        application.status = 'SUBMITTED'
        application.save()
        
        # Send notification
        Notification.objects.create(
            user=application.student,
            type='APPLICATION_UPDATE',
            title='Application Submitted',
            message=f'Your application {application.application_no} has been submitted successfully.'
        )
        
        return Response({'status': 'Application submitted successfully'})

    @action(detail=True, methods=['post'])
    def review(self, request, pk=None):
        if request.user.role not in ['ADMIN', 'STAFF']:
            return Response(
                {'error': 'Not authorized'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        application = self.get_object()
        serializer = ApplicationReviewSerializer(data=request.data)
        
        if serializer.is_valid():
            application.status = serializer.validated_data['status']
            application.review_comments = serializer.validated_data.get('review_comments', '')
            application.rejection_reason = serializer.validated_data.get('rejection_reason', '')
            application.reviewed_by = request.user
            application.review_date = timezone.now()
            application.save()
            
            # Send notification
            Notification.objects.create(
                user=application.student,
                type='APPLICATION_UPDATE',
                title='Application Status Updated',
                message=f'Your application {application.application_no} has been {application.status}.'
            )
            
            return Response({'status': 'Application reviewed successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)