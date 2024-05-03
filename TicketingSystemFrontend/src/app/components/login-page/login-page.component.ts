import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { User, UserRole } from '../../model/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email = '';
  password = '';
  loginFailed = false;
  loginErrorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = { email: this.email, password: this.password };
    
    this.authService.login(loginData).subscribe(
      (loginDTO) => {
        if(loginDTO.token.length > 0){
          const token = loginDTO.token;

          // Store JWT token in local storage
          this.authService.storeToken(token);

          // Get user information to determine role
          this.authService.getUser().subscribe(
            (user: User) => {
              switch (user.role) {
                case UserRole.ADMIN:
                  // Redirect admin to admin dashboard
                  this.router.navigate(['/admindashboard']);
                  break;
                case UserRole.TECHNICIAN:
                  // Redirect technician to technician dashboard
                  this.router.navigate(['/techniciandashboard']);
                  break;
                case UserRole.STUDENT:
                  // Redirect student to student dashboard
                  this.router.navigate(['/userdashboard']);
                  break;
                default:
                  // Redirect to a default dashboard or handle other roles
                  this.router.navigate(['/login']);
              }
            },
            (error) => {
              console.error('Error fetching user information:', error);
              // Handle error fetching user information
            }
          );
        }
        
      },
      (error) => {
        this.loginFailed = true;
        console.error('Login error:', error);
      }
    );
  }
}
