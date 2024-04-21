import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model'; 
import { Student } from '../model/student.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthserviceService {
  private baseUrl = 'http://localhost:18080/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  signUpAsStudent(studentData: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/signup`, studentData);
  }

  login(loginData: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, loginData); 
  }

  logout(studentData: Student): Observable<User> { 
    return this.http.post<User>(`${this.baseUrl}/logout`, studentData);
  }

  isAdmin(user: User): boolean {
    return user?.email === 'admin@gmail.com'; 
  }

  isValidStudent(student: Student): boolean {
    // Placeholder - You'll need backend support to fully implement this
    return student != null; 
  }
}
