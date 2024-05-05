import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { Ticket } from 'src/app/model/ticket.model';
import { Technician } from 'src/app/model/technician.model';
import { TechnicianserviceService } from 'src/app/services/technicianservice.service';
import { User } from '../../model/user.model';
import { AdminserviceService } from 'src/app/services/adminservice.service';


@Component({
  selector: 'app-managetechnician',
  templateUrl: './managetechnician.component.html',
  styleUrls: ['./managetechnician.component.css']
})

export class ManagetechnicianComponent implements OnInit {
  tickets: Ticket[] = [];
  showTechnicianPopup: boolean = false;
  selectedTicketId: number = 0;
  technicians: Technician[] = [];
  currentDate: string = this.getCurrentDate();
  showUpdateModal: boolean = false;
  showFilterModal: boolean = false;
  showTicketDetailsModal: boolean = false;
  showModal: boolean = false;
  selectedTicket: Ticket | null = null;
  category: string = '';
  title: string = '';
  description: string = '';
  priority: string = '';
  searchEmail: string = '';
  filteredTickets: Ticket[] = [];
  currentUserName: string = '';
  role: string = '';
  user: User | null = null;
  filterCategory: string = '';
  filterPriority: string = '';
  filterDate: string = '';
  filterStatus: string = '';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private ticketService: TicketserviceService,
    private technicianService: TechnicianserviceService,
    private adminService: AdminserviceService,
    private authService: AuthserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentDate = this.getCurrentDate(); // Set current date on init
    this.fetchTickets();
    this.loadTechnicians();
    this.getUserInfo();
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

  loadTechnicians() {
    this.technicianService.getAllTechnicians().subscribe(
      technicians => {
        this.technicians = technicians; // Store fetched technicians in the variable
      },
      error => {
        console.error('Error fetching technicians:', error);
        // Handle error appropriately
      }
    );
  }

  updateTicket(ticket: Ticket) {
    if (!ticket) {
      console.error('No ticket selected for update.');
      return;
    }
    // Implement logic to update ticket details
    console.log('this is called!!')
    this.ticketService.updateTicket(ticket.id, ticket).subscribe(
      (updatedTicket: Ticket) => {
        console.log('Ticket updated successfully:', updatedTicket);
        this.showUpdateModal = false; 
        window.location.reload();
      },
      (error) => {
        console.error('Error updating ticket:', error);
      }
    );
  }  
  
  displayTechnicianPopup(ticket: Ticket) {
    this.showTechnicianPopup = true;
    // Fetch technicians
    this.technicianService.getAllTechnicians().subscribe(technicians => {
      this.technicians = technicians;
    });
  }

  closeTechnicianPopup() {
    this.showTechnicianPopup = false;
  }

  // openAssignTechnicianPopup(ticketId: number, event: Event) {
  //   event.stopPropagation();
  //   this.selectedTicketId = ticketId; // Store the selected ticket ID
  //   this.showTechnicianPopup = true;
  //   // Fetch technicians
  //   this.technicianService.getAllTechnicians().subscribe(technicians => {
  //     this.technicians = technicians;
  //   });
  // }

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

  // assignTechnician(technician: Technician) {
  //   const technicianEmail = technician.email; // Get the technician's email
  //   const ticketId = this.selectedTicketId; // Get the selected ticket ID
  //   // Assign technician to the ticket
  //   this.adminService.assignTechnicianToTicket(ticketId, technicianEmail).subscribe((ticket: Ticket) => {
  //     // Handle success
  //     console.log('Technician assigned successfully:', ticket);
  //     // Close the pop-up window after assigning
  //     this.showTechnicianPopup = false;
  //     window.location.reload();
  //   }, error => {
  //     // Handle error
  //     console.error('Error assigning technician:', error);
  //   });
  // }

  // Method to update ticket


  // Method to resolve ticket
  markTicketResolved(ticketId: number, event: Event) {
    event.stopPropagation();
    this.ticketService.markTicketResolved(ticketId).subscribe(
      (resolvedTicket) => {
        console.log('Ticket marked as resolved:', resolvedTicket);
        window.location.reload();
      },
      (error) => {
        console.error('Error marking ticket as resolved:', error);
        // Optionally, handle the error or display a message to the user
      }
    );
  }

  // Method to reject ticket
  markTicketRejected(ticketId: number) {
    this.ticketService.markTicketRejected(ticketId).subscribe(
      (rejectedTicket) => {
        console.log('Ticket marked as resolved:', rejectedTicket);
        window.location.reload();
      },
      (error) => {
        console.error('Error marking ticket as resolved:', error);
        // Optionally, handle the error or display a message to the user
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

  displayModal(modalId: string, event?: MouseEvent): void {

    // Close all modals and open the selected one
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
    }
}

  fetchTickets() {
    this.ticketService.getAllTickets().subscribe(
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
        console.error('Error fetching tickets:', error);
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
    this.filterDate = '';
    this.filterStatus = '';
  
    this.fetchTickets();
  }
  

  displayUpdateModal(ticketId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.ticketService.getTicketById(ticketId) // Use the correct method from your service
    .subscribe(ticket => {
      this.selectedTicket = ticket;
      this.displayModal('update-form-container');
      console.log(this.selectedTicket)
    }, error => {
      console.error("Error fetching ticket details", error);
      // Handle the error appropriately
    });
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
