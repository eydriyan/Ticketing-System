import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../model/student.model'; // Assuming you have the necessary models
import { Technician } from '../model/technician.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; 
  private currentUserSubject: BehaviorSubject<Student | Technician | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Student | Technician | null>(
      JSON.parse(localStorage.getItem('currentUser') ?? '{}')
    );
  }

  public get currentUserValue(): Student | Technician | null {
    return this.currentUserSubject.value;
  }

  signUp(newUser: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/signup`, newUser)
      .pipe(map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  // Login for both Student and Technician
  login(email: string, password: string): Observable<Student | Technician> { 
    return this.http.post<Student | Technician>(`${this.apiUrl}/student/login`, { email, password }) // Updated endpoint
      .pipe(map((response) => {
        if (response) { 
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response; 
      }));
  }

  logout() {
    // Include backend logout endpoint call if needed
    // Replace 'Student' with the actual object being sent
    return this.http.post<any>(`${this.apiUrl}/logout`, this.currentUserValue as Student)
       .pipe(map(response => {
         localStorage.removeItem('currentUser');
         this.currentUserSubject.next(null);
         return response;
       }));
  }
}
