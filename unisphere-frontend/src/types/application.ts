export type ApplicationStatus = 
  | 'PENDING'
  | 'REVIEWING'
  | 'APPROVED'
  | 'REJECTED';

export interface Application {
  id: number;
  applicationNo: string;
  academicYearId: number;
  courseId: number;
  studentId: number;
  status: ApplicationStatus;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  nationality: string;
  aadharNumber: string;
  email: string;
  phoneNumber: string;
  permanentAddress: string;
  currentAddress: string;
  city: string;
  state: string;
  pincode: string;
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  annualFamilyIncome: number;
  tenthBoard: string;
  tenthYearOfPassing: number;
  tenthPercentage: number;
  twelfthBoard: string;
  twelfthYearOfPassing: number;
  twelfthPercentage: number;
  twelfthStream: string;
  appliedDate: string;
  lastUpdated: string;
  reviewedBy?: number;
  reviewDate?: string;
  reviewComments?: string;
  rejectionReason?: string;
}
