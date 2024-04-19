// ticket.model.ts
import { Student } from './student.model';
import { Technician } from './technician.model'; 

export interface Ticket {
  id: number;
  category: string;
  student: Student;  
  technician: Technician; 
  title: string;
  description: string;
  priority: string;
  status: string;
  dateCreated: Date; // Or string if your backend sends a formatted date string
}
