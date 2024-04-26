import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
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

  constructor(
    private technicianService: TechnicianserviceService,
    private router: Router,
    private ticketService: TicketserviceService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.fetchTickets();
    this.currentDate = this.getCurrentDate(); 
  }

  fetchTickets(): void {
    this.technicianService.getAllTicketsForCurrentTechnician().subscribe(
      (tickets: Ticket[]) => {

        // Filter out resolved tickets
        tickets = tickets.filter(ticket => ticket.status !== 'Resolved');

        // Sort tickets by priority (High > Medium > Low)
        this.tickets = tickets.sort((a, b) => {
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

  // toggleFilterForm() {
  //   this.showFilterForm = !this.showFilterForm;
  // }

  applyFilter() {
    // Implement filtering logic here
  }

  // toggleUpdateForm(ticket: Ticket) {
  //   this.showUpdateForm = !this.showUpdateForm;
  // }

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

  showTicketDetails(ticketId: number) {
    this.ticketService.getTicketById(ticketId) // Use the correct method from your service
      .subscribe(ticket => {
        this.selectedTicket = ticket;
        this.showTicketDetailsModal = true; // Assuming this controls the modal
        console.log(this.selectedTicket)
      }, error => {
        console.error("Error fetching ticket details", error);
        // Handle the error appropriately
      });
    }
  

  // showTicketDetails(ticket: Ticket) {
  //   this.selectedTicket = ticket;
  // }
  
  // closeTicketDetails() {
  //   this.selectedTicket = null;
  // }

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

