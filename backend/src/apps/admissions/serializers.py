from rest_framework import serializers
from .models import Department, Course, Application, AdmissionSchedule, AcademicYear

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = Course
        fields = '__all__'

class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = '__all__'

class AdmissionScheduleSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    academic_year_display = serializers.CharField(source='academic_year.year', read_only=True)

    class Meta:
        model = AdmissionSchedule
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    course_name = serializers.CharField(source='course.name', read_only=True)
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('application_no', 'status', 'reviewed_by', 'review_date')

    def create(self, validated_data):
        # Generate unique application number
        validated_data['application_no'] = f"APP{uuid.uuid4().hex[:8].upper()}"
        return super().create(validated_data)

class ApplicationListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    class Meta:
        model = Application
        fields = ('id', 'application_no', 'full_name', 'status', 'created_at')

class ApplicationReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('status', 'review_comments', 'rejection_reason')