import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

@Component({

  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  errorMessage: string = '';

  constructor(private authService: AuthserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signup(this.user)
      .subscribe(
        data => {
          console.log('Signup successful!');
          this.router.navigate(['/login']);
        },
        err => {
          this.errorMessage = 'An error occurred during signup. Please try again.';
          console.error(err);
        }
      );
  }
}
