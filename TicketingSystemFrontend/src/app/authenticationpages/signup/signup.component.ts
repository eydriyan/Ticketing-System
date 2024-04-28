import { Component } from '@angular/core';
import { Student } from '../../model/student.model';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/model/user.model';
// import { UserRole } from '../../model/user-role.enum';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  studentData: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    program: '',
    phoneNumber: '',
    studentNumber: '',
    role: UserRole.STUDENT
  };
  
  errorMessage: string = '';

  constructor(private authService: AuthserviceService, private router: Router) {}

  signUp() {
    this.authService.signUpAsStudent(this.studentData)
      .subscribe(
        (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Error during signup. Please try again.';
        }
      );
  }

}
