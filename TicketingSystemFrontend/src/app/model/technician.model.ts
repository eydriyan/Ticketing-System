import { User } from './user.model';

export interface Technician extends User {
  staffNumber: string;
  skillSet: string;
}