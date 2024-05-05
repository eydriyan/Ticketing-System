import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.authService.getUser().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user information:', error);
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
