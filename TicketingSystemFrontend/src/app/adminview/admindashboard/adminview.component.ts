import { Component, OnInit, ElementRef, Renderer2, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {
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
    }
  }

  private closeAllModals(): void {
    this.showFilterModal = false;
    this.showTicketDetailsModal = false;
    this.showUpdateModal = false;
  }
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.currentDate = this.getCurrentDate(); // Set current date on init
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
