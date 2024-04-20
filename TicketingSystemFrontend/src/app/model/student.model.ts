import { User } from './user.model';

export interface Student extends User {
  program: string;
  studentNumber: string;
}