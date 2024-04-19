import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service'; // Import your AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthserviceService ) {} // Inject AuthService

  ngOnInit() {}

  onSubmit() {
    // Call your AuthService login method and handle response
    this.authService.login(this.credentials.email, this.credentials.password).subscribe(
      (data) => {
        // Login successful, navigate to desired route
        console.log("Login successful!", data);
      },
      (error) => {
        // Login failed, handle error response
        console.error("Login error:", error);
      }
    );
  }
}
