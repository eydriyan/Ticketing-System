import { Component, OnInit, ElementRef, Renderer2, HostListener, ViewChild } from '@angular/core';
import { TicketserviceService } from '../../services/ticketservice.service';
import { Ticket } from '../../model/ticket.model'
import { TechnicianserviceService } from 'src/app/services/technicianservice.service';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { Technician } from 'src/app/model/technician.model';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {
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

  constructor(private renderer: Renderer2, private el: ElementRef,private ticketService: TicketserviceService, private technicianService: TechnicianserviceService, private adminService: AdminserviceService) { }

  ngOnInit(): void {
    this.currentDate = this.getCurrentDate(); // Set current date on init
    this.fetchTickets();
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

  openAssignTechnicianPopup(ticketId: number, event: Event) {
    event.stopPropagation();
    this.selectedTicketId = ticketId; // Store the selected ticket ID
    this.showTechnicianPopup = true;
    // Fetch technicians
    this.technicianService.getAllTechnicians().subscribe(technicians => {
      this.technicians = technicians;
    });
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

  assignTechnician(technician: Technician) {
    const technicianEmail = technician.email; // Get the technician's email
    const ticketId = this.selectedTicketId; // Get the selected ticket ID
    // Assign technician to the ticket
    this.adminService.assignTechnicianToTicket(ticketId, technicianEmail).subscribe((ticket: Ticket) => {
      // Handle success
      console.log('Technician assigned successfully:', ticket);
      // Close the pop-up window after assigning
      this.showTechnicianPopup = false;
      window.location.reload();
    }, error => {
      // Handle error
      console.error('Error assigning technician:', error);
    });
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
        console.error('Error fetching tickets:', error);
      }
    );
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
