import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({ providedIn: 'root' })
export class StudentserviceService {
  private baseUrl = 'http://localhost:18080/api/students'; 

  constructor(private http: HttpClient) {}

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
