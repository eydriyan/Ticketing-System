import { Component } from '@angular/core';
import { StudentserviceService } from '../services/studentservice.service';
import { TicketserviceService } from '../services/ticketservice.service';
import { Ticket } from '../model/ticket.model';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent {
  category: string = '';
  title: string = '';
  description: string = '';
  priority: string = '';

  constructor(private studentService: StudentserviceService, private ticketService: TicketserviceService) {}

  submitTicket() {

    const studentId = 0; 

    this.studentService.getStudentById(studentId).subscribe(
      (student: Student) => {
    
        const userEmail = student.email;

        if (!userEmail) {
          console.error('User email is not available.');
          return;
        }

        // Submit the ticket with the user's email
        this.ticketService.addTicket(this.category, this.title, this.description, this.priority, userEmail).subscribe(
          (ticket: Ticket) => {
            console.log('Ticket added successfully:', ticket);
          },
          (error) => {
            console.error('Error adding ticket:', error);
          }
        );
      },
      (error) => {
        // Handle error, e.g., display an error message
        console.error('Error retrieving student details:', error);
      }
    );
  }
}
