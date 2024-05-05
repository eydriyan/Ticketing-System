import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model'; 
import { Student } from '../model/student.model';
import { Technician } from '../model/technician.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthserviceService {
  private baseUrl = 'http://localhost:18080/api/auth'; 
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient, private router: Router) {}

  signUpAsStudent(studentData: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/signup`, studentData);
  }

  login(loginData: { email: string, password: string }): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.baseUrl}/login`, loginData); 
  }

  getUser(): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.baseUrl}/user`, { headers });
  }

  getStudent(): Observable<Student> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Student>(`${this.baseUrl}/student`, { headers });
  }

  getTechnician(): Observable<Technician> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Technician>(`${this.baseUrl}/technician`, { headers });
  }

  logout() { 
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

  isAdmin(user: User): boolean {
    return user?.email === 'admin@gmail.com'; 
  }

  isValidStudent(student: Student): boolean {
    // Placeholder - You'll need backend support to fully implement this
    return student != null; 
  }

  // Store JWT token in local storage
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove JWT token from local storage (logout)
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
