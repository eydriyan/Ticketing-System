import { Student } from './student.model';
import { Technician } from './technician.model';

export interface Ticket {
  id: number; // Assuming the id is a number
  category: string;
  student: Student;
  technician: Technician | null; // Technician can now be assigned
  title: string;
  description: string;
  priority: string;
  status: string;
  dateCreated: string; // Assuming this is a string representation of a date 
  dateResolved: string; // Assuming this a string representation of a date
}
