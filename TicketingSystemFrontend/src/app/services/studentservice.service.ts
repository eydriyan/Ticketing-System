import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';
import { Ticket } from '../model/ticket.model';
import { AuthserviceService } from '../services/authservice.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentserviceService {
  private baseUrl = 'http://localhost:18080/api/student'; 

  constructor(private http: HttpClient, private authService: AuthserviceService) {}

  getAllTicketsForCurrentStudent(): Observable<Ticket[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Ticket[]>(`${this.baseUrl}/my-tickets`, { headers });
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/all`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/get/${id}`);
  }

  updateStudent(id: number, updatedStudent: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/update/${id}`, updatedStudent);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
