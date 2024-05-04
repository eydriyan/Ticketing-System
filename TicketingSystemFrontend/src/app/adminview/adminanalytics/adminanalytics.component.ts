import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { Ticket } from 'src/app/model/ticket.model';
import { Technician } from 'src/app/model/technician.model';
import { TechnicianserviceService } from 'src/app/services/technicianservice.service';
import { User } from '../../model/user.model';

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
  currentUserName: string = '';
  role: string = '';
  user: User | null = null;

  
  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private ticketService: TicketserviceService,
    private technicianService: TechnicianserviceService
  ) {}

  ngOnInit(): void {
    this.getTicketStatusCounts();
    this.getAllTechniciansWithResolvedTickets();
    this.getUserInfo();
    this.getResolvedTicketsByCategory();
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


  getTicketStatusCounts(): void {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        const pendingCount = tickets.filter(ticket => ticket.status === 'Pending').length;
        const inProgressCount = tickets.filter(ticket => ticket.status === 'In progress').length;
        const resolvedCount = tickets.filter(ticket => ticket.status === 'Resolved').length;
  
        this.ticketCounts = {
          'Pending': pendingCount,
          'In Progress': inProgressCount,
          'Resolved': resolvedCount
        };

        // Create a new dataPoints array
        const dataPoints = Object.entries(this.ticketCounts).map(([status, count]) => ({ y: count, label: status }));

        // Construct a new ticketStatusChart object
        this.ticketStatusChart = {
          ...this.ticketStatusChart, // Keep other chart configurations
          data: [{
            ...this.ticketStatusChart.data[0], // Keep existing data properties
            dataPoints 
          }]
        };

      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }  

  getResolvedTicketsByCategory(): void {
    const categories = ['Account Lockout', 'Network Problem', 'Network Security Issue', 'Hardware Issue'];
    const resolvedTicketsByCategory: { [category: string]: number } = {};
  
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        // Filter for resolved tickets
        const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved');
  
        // Initialize counts for each category
        categories.forEach(category => {
          resolvedTicketsByCategory[category] = 0; 
        });
  
    // Count resolved tickets in each category
    resolvedTickets.forEach(ticket => {
      resolvedTicketsByCategory[ticket.category] = (resolvedTicketsByCategory[ticket.category] || 0) + 1; 
    });
  
        // Construct data for your chart
        const dataPoints = Object.entries(resolvedTicketsByCategory).map(([category, count]) => ({ y: count, label: category }));
  
        this.ticketResolvedByCategory = {
          ...this.ticketResolvedByCategory,
          data: [{
            ...this.ticketResolvedByCategory.data[0],
            dataPoints 
          }]
        };

        console.log(this.ticketResolvedByCategory);
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

  ticketStatusChart = {
    animationEnabled: true,
    title: {
        text: "Ticket Status Distribution" 
    },
    data: [{
        type: "column", 
        dataPoints: Array<{ y: number, label: string }>() 
    }]
  };

  ticketResolvedByCategory = {
    animationEnabled: true,
    title: {
        text: "Resolved Tickets By Category" 
    },
    data: [{
        type: "pie",  
        indexLabel: "{label}: {y}",
        dataPoints: Array<{ y: number, label: string }>() 
    }]
  };
}
