// student.model.ts
import { User } from './user.model';

export interface Student extends User { // Student inherits from User 
  program: string;
  studentNumber: string;
}
