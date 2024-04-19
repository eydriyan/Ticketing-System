import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model'; 

@Injectable({ providedIn: 'root' })
export class AuthserviceService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject: BehaviorSubject<User | null>; 

  constructor(private http: HttpClient) { 
      this.currentUserSubject = new BehaviorSubject<User | null>(
        JSON.parse(localStorage.getItem('currentUser') ?? '{}') 
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student/login`, { email, password })
      .pipe(map(response => {
   
        if (response && response.token) { 
          localStorage.setItem('currentUser', JSON.stringify(response.user)); 
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  signup(newUser: User): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/signup`, newUser)
      .pipe(map(response => {
        // If successful signup (Adapt based on backend response)
        if (response && response.token) { 
          localStorage.setItem('currentUser', JSON.stringify(response.user)); 
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  logout() {
    // Include backend logout endpoint call if needed
    localStorage.removeItem('currentUser'); 
    this.currentUserSubject.next(null); 
  }
}
