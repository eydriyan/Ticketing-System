
export enum UserRole {
  STUDENT = 'STUDENT',
  TECHNICIAN = 'TECHNICIAN',
  ADMIN = 'ADMIN'
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userRole: UserRole;
  
}