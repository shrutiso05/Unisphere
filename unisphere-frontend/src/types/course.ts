export interface Course {
    id: number;
    departmentId: number;
    name: string;
    code: string;
    description: string;
    durationYears: number;
    totalSemesters: number;
    seatsAvailable: number;
    minimumPercentage: number;
    admissionFee: number;
    tuitionFeePerSemester: number;
    eligibilityCriteria: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }