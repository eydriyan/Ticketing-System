import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model'; 
import { Student } from '../model/student.model';
import { Technician } from '../model/technician.model';

@Injectable({ providedIn: 'root' })
export class AuthserviceService {
  private baseUrl = 'http://localhost:18080/api/auth'; 

  currentUserEmail: string | null = null;

  constructor(private http: HttpClient) {}

  signUpAsStudent(studentData: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/signup`, studentData);
  }

  loginAsStudent(studentData:   {email: string, password: string}): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/student/login`, studentData);
  }

  loginAsTechnician(technicianData: {email: string, password: string}): Observable<Technician> {
    return this.http.post<Technician>(`${this.baseUrl}/technician/login`, technicianData);
  }

  logout(studentData: Student): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/logout`, studentData);
  }

  // Method to set current user email upon login
  setCurrentUserEmail(email: string) {
    this.currentUserEmail = email;
    console.log(this.currentUserEmail)
  }

  // Method to get current user email
  getCurrentUserEmail(): string | null {

    return this.currentUserEmail;
  }
  
}


