import { Component, OnInit } from '@angular/core';
import { TicketserviceService } from '../../services/ticketservice.service';
import { Router } from '@angular/router'; 
import { Ticket } from '../../model/ticket.model';
import { TechnicianserviceService } from '../../services/technicianservice.service';

@Component({
  selector: 'app-technicianview',
  templateUrl: './technicianview.component.html',
  styleUrls: ['./technicianview.component.css']
})
export class TechnicianviewComponent implements OnInit {
  showaddticketForm: boolean = false;
  showFilterForm: boolean = false;
  showUpdateForm: boolean = false;
  filterCategory: string = '';
  filterPriority: string = '';
  filterDate: string = '';
  filterStatus: string = '';
  filterTechnician: string = '';
  selectedTicket: Ticket | null = null;
  tickets: Ticket[] = [];

  constructor(private technicianService: TechnicianserviceService, private router: Router, private ticketService: TicketserviceService) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.technicianService.getAllTicketsForCurrentTechnician().subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
      (error) => {
        console.error('Failed to load user tickets:', error);
      }
    );
  }

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
  }

  applyFilter() {
    // Implement filtering logic here
  }

  toggleUpdateForm(ticket: Ticket) {
    this.showUpdateForm = !this.showUpdateForm;
  }

  updateTicket(ticket: Ticket) {
    // Implement logic to update ticket details
    this.ticketService.updateTicket(ticket.id, ticket).subscribe(
      (updatedTicket: Ticket) => {
        console.log('Ticket updated successfully:', updatedTicket);
        // Optionally, you can perform any additional logic here, such as displaying a success message
        this.showUpdateForm = false; // Hide the update form after updating
      },
      (error) => {
        console.error('Error updating ticket:', error);
        // Optionally, handle the error, such as displaying an error message to the user
      }
    );
  }
  

  showTicketDetails(ticket: Ticket) {
    this.selectedTicket = ticket;
  }
  
  closeTicketDetails() {
    this.selectedTicket = null;
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'color-high';
      case 'Medium':
        return 'color-med';
      case 'Low':
        return 'color-low';
      default:
        return ''; // Default class if priority is not recognized
    }
  }

  logout() {
    // Implement logout logic here
  }
}

