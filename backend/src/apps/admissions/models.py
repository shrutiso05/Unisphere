class Department(BaseModel):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)
    head_of_department = models.CharField(max_length=100)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=17)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'departments'
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['is_active']),
        ]

class Course(BaseModel):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    duration_years = models.IntegerField()
    total_semesters = models.IntegerField()
    seats_available = models.IntegerField()
    minimum_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    admission_fee = models.DecimalField(max_digits=10, decimal_places=2)
    tuition_fee_per_semester = models.DecimalField(max_digits=10, decimal_places=2)
    eligibility_criteria = models.TextField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'courses'
        indexes = [
            models.Index(fields=['department', 'is_active']),
            models.Index(fields=['code']),
        ]

class AcademicYear(BaseModel):
    year = models.CharField(max_length=9)  # Format: 2023-2024
    is_active = models.BooleanField(default=True)
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        db_table = 'academic_years'

class AdmissionSchedule(BaseModel):
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    application_start_date = models.DateTimeField()
    application_end_date = models.DateTimeField()
    document_verification_start_date = models.DateTimeField()
    document_verification_end_date = models.DateTimeField()
    admission_list_date = models.DateTimeField()
    fee_payment_deadline = models.DateTimeField()
    class_start_date = models.DateField()

    class Meta:
        db_table = 'admission_schedules'
        indexes = [
            models.Index(fields=['academic_year', 'course']),
        ]

class Application(BaseModel):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('SUBMITTED', 'Submitted'),
        ('UNDER_REVIEW', 'Under Review'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected')
    ]

    application_no = models.CharField(max_length=20, unique=True)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey('users.User', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    
    # Personal Details
    full_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    category = models.CharField(max_length=20)
    nationality = models.CharField(max_length=50)
    aadhar_number = models.CharField(max_length=12, unique=True)
    
    # Contact Details
    email = models.EmailField()
    phone_number = models.CharField(max_length=17)
    permanent_address = models.TextField()
    current_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)
    
    # Family Details
    father_name = models.CharField(max_length=200)
    father_occupation = models.CharField(max_length=100)
    father_phone = models.CharField(max_length=17)
    mother_name = models.CharField(max_length=200)
    mother_occupation = models.CharField(max_length=100)
    mother_phone = models.CharField(max_length=17)
    annual_family_income = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Academic Details
    tenth_board = models.CharField(max_length=100)
    tenth_year_of_passing = models.IntegerField()
    tenth_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    tenth_marksheet = models.FileField(upload_to='documents/tenth/')
    twelfth_board = models.CharField(max_length=100)
    twelfth_year_of_passing = models.IntegerField()
    twelfth_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    twelfth_marksheet = models.FileField(upload_to='documents/twelfth/')
    twelfth_stream = models.CharField(max_length=20)
    
    # Documents
    photo = models.ImageField(upload_to='documents/photos/')
    signature = models.ImageField(upload_to='documents/signatures/')
    aadhar_card = models.FileField(upload_to='documents/aadhar/')
    category_certificate = models.FileField(upload_to='documents/category/', null=True, blank=True)
    
    # Review Details
    reviewed_by = models.ForeignKey('users.User', null=True, blank=True, 
                                  on_delete=models.SET_NULL, related_name='reviewed_applications')
    review_date = models.DateTimeField(null=True, blank=True)
    review_comments = models.TextField(blank=True)
    rejection_reason = models.TextField(blank=True)

    class Meta:
        db_table = 'applications'
        indexes = [
            models.Index(fields=['application_no']),
            models.Index(fields=['status']),
            models.Index(fields=['student', 'academic_year']),
        ]