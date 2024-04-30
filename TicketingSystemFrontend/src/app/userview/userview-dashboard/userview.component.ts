import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { TicketserviceService } from '../../services/ticketservice.service';
import { StudentserviceService } from '../../services/studentservice.service';
import { Ticket } from '../../model/ticket.model';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

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
  searchTechnicianEmail: string = '';
  selectedTicket: Ticket | null = null;
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  categoryOptions: string[] = []; // Define your category options
  priorityOptions: string[] = []; // Define your priority options
  currentUserName: string = '';
  role: string = '';
  user: User | null = null;

  constructor(
    private studentService: StudentserviceService,
    private ticketService: TicketserviceService,
    private authService: AuthserviceService,
    private renderer: Renderer2, 
    private el: ElementRef,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.fetchTickets();
    this.currentDate = this.getCurrentDate();
    this.getUserInfo();
    this.categoryOptions = ['Account Lockout', 'Network Problem', 'Network Security Issue', 'Hardware Issue'];
    this.priorityOptions = ['Low', 'Medium', 'High'];
  }

  subjectToCategoryPriorityMap: { [subject: string]: { category: string, priority: string } } = {
    'Blackboard Account failed log-in': { category: 'Account Lockout', priority: 'Medium' },
    'Mymapua Account failed log-in': { category: 'Account Lockout', priority: 'High' },
    'Wi-fi Connectivity Problem': { category: 'Network Problem', priority: 'High' },
    'Network Security Concern': { category: 'Network Security Issue', priority: 'High' },
    'E-mail: Spam Filtering': { category: 'Network Security Issue', priority: 'High' },
    'E-mail: Security': { category: 'Network Security Issue', priority: 'High' },
    'PC Malfunctioning': { category: 'Hardware Issue', priority: 'High' },
    'Keyboard not working': { category: 'Hardware Issue', priority: 'High' },
    'Monitor not turning on': { category: 'Hardware Issue', priority: 'High' }
  };

  onSubjectChange(event: any): void {
    const selectedSubject = event.target.value;
    const mappedValues = this.subjectToCategoryPriorityMap[selectedSubject];
    if (mappedValues) {
      this.category = mappedValues.category;
      this.priority = mappedValues.priority;
    } else {
      // Reset category and priority if subject does not have mapping
      this.category = 'select category';
      this.priority = 'select priority';
    }
  }

  fetchTickets(): void {
    this.studentService.getAllTicketsForCurrentStudent().subscribe(
      (tickets: Ticket[]) => {

        // Filter out resolved tickets
        this.tickets = tickets.filter(ticket => ticket.status !== 'Resolved' && ticket.status !== 'Rejected');
        
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
  
      // if (this.filterDate && ticket.dateCreated !== this.filterDate) {
      //   passesFilter = false;
      // }
  
      if (this.filterStatus && ticket.status !== this.filterStatus) {
        passesFilter = false;
      }
  
      return passesFilter;
    });
  }

  applySearch(): void {
    if (!this.searchTechnicianEmail.trim()) {
      this.filteredTickets = this.tickets;
      return;
    }
  
    this.filteredTickets = this.tickets.filter(ticket => {
      // Filter tickets where technician email matches the search input
      return ticket?.technician?.email.toLowerCase().includes(this.searchTechnicianEmail.toLowerCase());
    });
  }

  clearFilter(): void {
    // Reset filter criteria and fetch all tickets again
    this.filterCategory = '';
    this.filterPriority = '';
    this.filterDate = '';
    this.filterStatus = '';
  
    this.fetchTickets();
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
  
  addTicket() {
    if (!this.title || !this.priority || !this.category || !this.description) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.ticketService.addTicket(this.title, this.priority, this.category, this.description)
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
