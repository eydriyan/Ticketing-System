// technician.model.ts
import { User } from './user.model';

export interface Technician extends User { // Technician inherits from User 
  staffNumber: string;
  skillSet: string;
  availability: string;
}
