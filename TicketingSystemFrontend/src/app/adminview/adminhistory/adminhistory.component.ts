import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Ticket } from '../../model/ticket.model';
import { TechnicianserviceService } from '../../services/technicianservice.service'; // change to admin service
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-adminhistory',
  templateUrl: './adminhistory.component.html',
  styleUrls: ['./adminhistory.component.css']
})
export class AdminhistoryComponent implements OnInit {
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
  selectedTicket: Ticket | null = null;
  tickets: Ticket[] = [];
  searchEmail: string = '';
  filteredTickets: Ticket[] = [];
  currentUserName: string = '';
  role: string = '';
  user: User | null = null;

  constructor(
    private technicianService: TechnicianserviceService, // change to admin service
    private el: ElementRef,
    private ticketService: TicketserviceService,
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllTickets();
    this.currentDate = this.getCurrentDate();
    this.getUserInfo();
  }

  fetchAllTickets() {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
      // Filter out resolved tickets
      this.tickets = tickets.filter(ticket => ticket.status === 'Resolved' || ticket.status === 'Rejected');

      // Sort tickets by priority (High > Medium > Low)
      this.filteredTickets = this.tickets.sort((a, b) => {
        if (a.priority === 'High') return -1;
        if (a.priority === 'Medium' && b.priority !== 'High') return -1;
        if (a.priority === 'Low' && b.priority !== 'High' && b.priority !== 'Medium') return -1;
        return 1;
      });
      },
      (error) => {
        console.error('Error fetching tickets:', error);
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
        return ''; // Default class if priority is not recognized
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
  
      if (this.filterStatus && ticket.status !== this.filterStatus) {
        passesFilter = false;
      }
  
      return passesFilter;
    });
  }

  applySearch(): void {
    if (!this.searchEmail.trim()) {
      this.filteredTickets = this.tickets;
      return;
    }
  
    // Filter tickets where either technician or student email matches the search input
    this.filteredTickets = this.tickets.filter(ticket => {
      return ticket?.technician?.email.toLowerCase().includes(this.searchEmail.toLowerCase()) ||
             ticket?.student?.email.toLowerCase().includes(this.searchEmail.toLowerCase());
    });
  }

  clearFilter(): void {
    // Reset filter criteria and fetch all tickets again
    this.filterCategory = '';
    this.filterPriority = '';
    this.filterDateCreated = '';
    this.filterDateResolved = '';
    this.filterStatus = '';
  
    this.fetchAllTickets();
  }

  showTicketDetails(ticketId: number) {
    this.ticketService.getTicketById(ticketId) // Use the correct method from your service
      .subscribe(ticket => {
        this.selectedTicket = ticket;
        this.showTicketDetailsModal = true; // Assuming this controls the modal
      }, error => {
        console.error("Error fetching ticket details", error);
        // Handle the error appropriately
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
