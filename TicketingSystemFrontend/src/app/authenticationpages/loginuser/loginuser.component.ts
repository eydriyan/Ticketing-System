import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service'; 
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
 
@Component({
  selector: 'app-login',  
  templateUrl: './loginuser.component.html', 
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent {
  email = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthserviceService, private router: Router) {}

  login() {
    const loginData = { email: this.email, password: this.password };
    
    this.authService.login(loginData).subscribe(
      (loginDTO) => {
        if(loginDTO.token.length > 0){
          this.router.navigate(['/user']); // Redirect to user dashboard
        }
        
      },
      (error) => {
        this.loginFailed = true;
        console.error('Login error:', error);
      }
    );
  }
  
}
