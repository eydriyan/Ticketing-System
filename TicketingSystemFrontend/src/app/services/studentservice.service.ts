import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model'; // Import your Student model

@Injectable({ providedIn: 'root' })
export class StudentserviceService {
  private apiUrl = 'http://localhost:8080/api/students'; 

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/all`);
  }

  getStudentById(id: number): Observable<Student> { 
    return this.http.get<Student>(`${this.apiUrl}/get/${id}`);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/update/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getStudentByEmail(email: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/get-by-email?email=${email}`); // Backend endpoint needed
  }
}
