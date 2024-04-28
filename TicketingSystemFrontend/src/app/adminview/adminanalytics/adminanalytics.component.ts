import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { Ticket } from 'src/app/model/ticket.model';
import { Technician } from 'src/app/model/technician.model';
import { TechnicianserviceService } from 'src/app/services/technicianservice.service';


@Component({
  selector: 'app-adminanalytics',
  templateUrl: './adminanalytics.component.html',
  styleUrls: ['./adminanalytics.component.css']
})


export class AdminanalyticsComponent implements OnInit {
  showFilterForm: boolean = false;
  ticketCounts: { [key: string]: number } = {};
  technicians: Technician[] = [];
  resolvedTicketsMap: { [technicianId: number]: number } = {};

  
  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private ticketService: TicketserviceService,
    private technicianService: TechnicianserviceService
  ) {}

  ngOnInit(): void {
    this.getTicketCounts();
    this.getAllTechniciansWithResolvedTickets();
  }

  getAllTechniciansWithResolvedTickets(): void {
    this.technicianService.getAllTechnicians().subscribe(
      (technicians: Technician[]) => {
        this.technicians = technicians;
        // Fetch resolved tickets for each technician
        this.technicians.forEach(technician => {
          this.getResolvedTicketsForTechnician(technician.id);
        });
      },
      (error) => {
        console.error('Error fetching technicians:', error);
      }
    );
  }

  getResolvedTicketsForTechnician(technicianId: number): void {
    this.ticketService.getResolvedTicketsByTechnicianId(technicianId).subscribe(
      (tickets: Ticket[]) => {
        this.resolvedTicketsMap[technicianId] = tickets.length;
        // Once resolved tickets are fetched for all technicians, sort the technicians based on resolved tickets count
        if (Object.keys(this.resolvedTicketsMap).length === this.technicians.length) {
          this.sortTechniciansByResolvedTickets();
        }
      },
      (error) => {
        console.error(`Error fetching resolved tickets for technician ${technicianId}:`, error);
      }
    );
  }

  sortTechniciansByResolvedTickets(): void {
    this.technicians.sort((a, b) => {
      return this.resolvedTicketsMap[b.id] - this.resolvedTicketsMap[a.id];
    });
  }

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
  }


  getTicketCounts(): void {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        const onHoldCount = tickets.filter(ticket => ticket.status === 'On Hold').length;
        const inProgressCount = tickets.filter(ticket => ticket.status === 'In Progress').length;
        const resolvedCount = tickets.filter(ticket => ticket.status === 'Resolved').length;
  
        this.ticketCounts = {
          'On Hold': onHoldCount,
          'In Progress': inProgressCount,
          'Resolved': resolvedCount
        };

              // Display the ticket counts in the console
      console.log('On Hold:', onHoldCount);
      console.log('In Progress:', inProgressCount);
      console.log('Resolved:', resolvedCount);
      },
      (error) => {
        console.error('Error fetching tickets:', error);
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
}
