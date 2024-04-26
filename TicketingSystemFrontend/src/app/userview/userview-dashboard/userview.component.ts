import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { TicketserviceService } from '../../services/ticketservice.service';
import { StudentserviceService } from '../../services/studentservice.service';
import { Ticket } from '../../model/ticket.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit{
  category: string = '';
  title: string = '';
  description: string = '';
  priority: string = '';
  errorMessage: string = '';
  showaddticketForm: boolean = false;
  showFilterForm: boolean = false;
  filterCategory: string = '';
  filterPriority: string = '';
  filterDate: string = '';
  filterStatus: string = '';
  filterTechnician: string = '';
  selectedTicket: Ticket | null = null;
  tickets: Ticket[] = [];

  constructor(
    // private authService: AuthserviceService,
    private studentService: StudentserviceService,
    private ticketService: TicketserviceService,
    private authService: AuthserviceService
  ) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.studentService.getAllTicketsForCurrentStudent().subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
      (error) => {
        console.error('Failed to load user tickets:', error);
      }
    );
  }

  toggleaddticketForm() {
    this.showaddticketForm = !this.showaddticketForm;
  }

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
  }

  applyFilter() {

  }
  

  addTicket() {
    if (!this.category || !this.title || !this.description || !this.priority) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const userEmail = 'samplestudent@gmail.com';

    // if (!userEmail) {
    //   console.error('User email not found');
    //   this.errorMessage = 'Failed to retrieve user email. Please try again later.';
    //   return;
    // }

    this.ticketService.addTicket(this.category, this.title, this.description, this.priority)
      .subscribe(
        (ticket: Ticket) => {
          console.log('Ticket added successfully:', ticket);
          window.location.reload();
        },
        (error) => {
          console.error('Error adding ticket:', error);
          this.errorMessage = 'Failed to add ticket. Please try again later.';
        }
      );
  }

  showTicketDetails(ticket: Ticket) {
    this.selectedTicket = ticket;
  }
  
  closeTicketDetails() {
    this.selectedTicket = null;
  }

  logout() {
  
    console.log('Logout clicked');
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
  
}
