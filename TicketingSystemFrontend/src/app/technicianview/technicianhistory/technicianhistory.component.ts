import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Ticket } from '../../model/ticket.model';
import { TechnicianserviceService } from '../../services/technicianservice.service';
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-technicianhistory',
  templateUrl: './technicianhistory.component.html',
  styleUrls: ['./technicianhistory.component.css']
})
export class TechnicianhistoryComponent implements OnInit {
  category: string = '';
  title: string = '';
  description: string = '';
  priority: string = '';
  dateResolved: string = '';
  errorMessage: string = '';
  showaddticketForm: boolean = false;
  showFilterForm: boolean = false;
  filterCategory: string = '';
  filterPriority: string = '';
  filterDateCreated: string = '';
  filterDateResolved: string = '';
  filterStatus: string = '';
  searchStudentEmail: string = '';
  selectedTicket: Ticket | null = null;
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  currentUserName: string = '';
  role: string = '';
  user: User | null = null;

  constructor(
    private technicianService: TechnicianserviceService,
    private el: ElementRef,
    private ticketService: TicketserviceService,
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTickets();
    this.currentDate = this.getCurrentDate();
    this.getUserInfo();
  }

  fetchTickets(): void {
    this.technicianService.getAllTicketsForCurrentTechnician().subscribe(
      (tickets: Ticket[]) => {

        // Filter out resolved tickets
        this.tickets = tickets.filter(ticket => ticket.status === 'Resolved');

        // Sort tickets by priority (High > Medium > Low)
        this.filteredTickets = this.tickets.sort((a, b) => {
          if (a.priority === 'High') return -1;
          if (a.priority === 'Medium' && b.priority !== 'High') return -1;
          if (a.priority === 'Low' && b.priority !== 'High' && b.priority !== 'Medium') return -1;
          return 1;
        });
      },
      (error) => {
        console.error('Failed to load user tickets:', error);
      }
    );
  }

  getUserInfo(): void {
    this.authService.getUser().subscribe(
      (user: User) => {
        this.user = user;
        this.currentUserName = `${user.firstName} ${user.lastName}`;
        this.role = user.role;
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
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
        return '';
    }
  }

  applyFilter(): void {
    // Filter the tickets based on the selected filter criteria
    this.filteredTickets = this.tickets.filter(ticket => {
      let passesFilter = true;
  
      if (this.filterCategory && ticket.category !== this.filterCategory) {
        passesFilter = false;
      }
  
      if (this.filterPriority && ticket.priority !== this.filterPriority) {
        passesFilter = false;
      }
  
      if (this.filterDateCreated && new Date(ticket.dateCreated).toISOString().split('T')[0] !== this.filterDateCreated) {
        passesFilter = false;
      }

      if (this.filterDateResolved && new Date(ticket.dateResolved).toISOString().split('T')[0] !== this.filterDateResolved) {
        passesFilter = false;
      }
  
      return passesFilter;
    });
  }

  applySearch(): void {
    if (!this.searchStudentEmail.trim()) {
      this.filteredTickets = this.tickets;
      return;
    }
  
    this.filteredTickets = this.tickets.filter(ticket => {
      // Filter tickets where technician email matches the search input
      return ticket?.student?.email.toLowerCase().includes(this.searchStudentEmail.toLowerCase());
    });
  }

  clearFilter(): void {
    // Reset filter criteria and fetch all tickets again
    this.filterCategory = '';
    this.filterPriority = '';
    this.filterDateCreated = '';
    this.filterDateResolved = '';
    this.filterStatus = '';
  
    this.fetchTickets();
  }

  hasFilterValue(): boolean {
    return (
      this.filterCategory !== '' ||
      this.filterPriority !== '' ||
      this.filterDateCreated !== '' ||
      this.filterDateResolved !== '' ||
      this.filterStatus !== ''
    );
  }
  

  showTicketDetails(ticketId: number) {
    this.ticketService.getTicketById(ticketId)
      .subscribe(ticket => {
        this.selectedTicket = ticket;
        this.showTicketDetailsModal = true;
      }, error => {
        console.error("Error fetching ticket details", error);
      });
    }

  // Method to log out the user
  logout() {
    // Call the logout method from AuthService
    this.authService.logout().subscribe(
      () => {
        // Clear the JWT token from local storage
        this.authService.clearToken();

        // Redirect to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }

  currentDate: string = this.getCurrentDate();
  showUpdateModal: boolean = false;
  showFilterModal: boolean = false;
  showTicketDetailsModal: boolean = false;
  showModal: boolean = false;

  displayModal(modalId: string): void {
    this.closeAllModals();
    switch(modalId) {
      case 'Filter-form-container':
        this.showFilterModal = true;
        break;
      case 'ticket-details-container':
        this.showTicketDetailsModal = true;
        break;
      case 'update-form-container':
        this.showUpdateModal = true;
        break;
      case 'ticket-form-container':
        this.showaddticketForm = true;
    }
  }
  displayUpdateModal(event: MouseEvent): void {
    event.stopPropagation();
    this.displayModal('update-form-container');
  }

  closeModal(modalId: string): void {
    switch(modalId) {
      case 'Filter-form-container':
        this.showFilterModal = false;
        break;
      case 'ticket-details-container':
        this.showTicketDetailsModal = false;
        break;
      case 'update-form-container':
        this.showUpdateModal = false;
        break;
      case 'ticket-form-container':
        this.showaddticketForm = false;
    }
  }

  private closeAllModals(): void {
    this.showFilterModal = false;
    this.showTicketDetailsModal = false;
    this.showUpdateModal = false;
  }

  getCurrentDate(offset: number | undefined = undefined): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear() + (parseInt(offset?.toString() || '0') || 0);
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent, modalId: string): void {
    const modal = this.el.nativeElement.querySelector('#' + modalId);
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent.contains(event.target as Node)) {
      this.closeModal(modalId);
    }
  }
}
