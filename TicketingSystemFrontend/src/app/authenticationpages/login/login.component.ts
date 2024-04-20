import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthserviceService, private router: Router) {}

  login() {
    this.authService.loginAsStudent({ email: this.email, password: this.password }).subscribe(
      (loginSuccessful) => {
        if (loginSuccessful) {
          this.router.navigate(['/user']);
          this.authService.setCurrentUserEmail(this.email);

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
