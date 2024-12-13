export type UserRole = 'ADMIN' | 'STAFF' | 'STUDENT'

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  phoneNumber: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}