import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-userview-profile',
  templateUrl: './userview-profile.component.html',
  styleUrls: ['./userview-profile.component.css']
})
export class UserviewProfileComponent implements OnInit {
  student: Student | null = null;

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo(): void {
    this.authService.getStudent().subscribe(
      (student: Student) => {
        this.student = student;
      },
      (error) => {
        console.error('Error fetching student information:', error);
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
