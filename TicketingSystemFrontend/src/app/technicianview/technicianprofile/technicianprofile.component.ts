import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { Technician } from '../../model/technician.model';

@Component({
  selector: 'app-technicianprofile',
  templateUrl: './technicianprofile.component.html',
  styleUrls: ['./technicianprofile.component.css']
})
export class TechnicianprofileComponent implements OnInit {
  technician: Technician | null = null;

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTechnicianInfo();
  }

  getTechnicianInfo(): void {
    this.authService.getTechnician().subscribe(
      (technician: Technician) => {
        this.technician = technician;
      },
      (error) => {
        console.error('Error fetching technician information:', error);
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
