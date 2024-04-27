import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminanalytics',
  templateUrl: './adminanalytics.component.html',
  styleUrls: ['./adminanalytics.component.css']
})
export class AdminanalyticsComponent implements OnInit {
  showFilterForm: boolean = false;

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
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
