import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { TicketserviceService } from '../services/ticketservice.service';
import { Ticket } from '../model/ticket.model';

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
  errorMessage: string = '';
  showForm: boolean = false;
  tickets: Ticket[] = [];

  constructor(
    // private authService: AuthserviceService,
    private ticketService: TicketserviceService
  ) {}

  ngOnInit() {
    this.fetchTickets();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addTicket() {
    if (!this.category || !this.title || !this.description || !this.priority) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const userEmail = 'kurtianrumbaua@gmail.com';

    // if (!userEmail) {
    //   console.error('User email not found');
    //   this.errorMessage = 'Failed to retrieve user email. Please try again later.';
    //   return;
    // }

    this.ticketService.addTicket(this.category, this.title, this.description, this.priority, userEmail)
      .subscribe(
        (ticket: Ticket) => {
          // Handle successful ticket submission, e.g., display a success message
          console.log('Ticket added successfully:', ticket);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error adding ticket:', error);
          this.errorMessage = 'Failed to add ticket. Please try again later.';
        }
      );
  }

  fetchTickets() { 
    const userID = 2;  
    this.ticketService.getTicketsByStudentId(userID)  // Assuming getTicketsByUser exists
       .subscribe(tickets => this.tickets = tickets); 
       
       
  }
}
