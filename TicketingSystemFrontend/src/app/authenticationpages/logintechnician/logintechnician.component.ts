import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',  
  templateUrl: './logintechnician.component.html', 
  styleUrls: ['./logintechnician.component.css']
})
export class LogintechnicianComponent {
  email = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthserviceService, private router: Router) {}

  login() {
    this.authService.loginAsTechnician({ email: this.email, password: this.password }).subscribe(
      (loginSuccessful) => {
        if (loginSuccessful) {
          this.router.navigate(['/technician']);
        } else {

          this.loginFailed = true;
        }
      },
      (error) => {
        this.loginFailed = true;
      }
    );
  }
}
