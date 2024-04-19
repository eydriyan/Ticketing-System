import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technician } from '../model/technician.model';

@Injectable({ providedIn: 'root' })
export class TechnicianserviceService {
  private apiUrl = 'http://localhost:8080/api/technicians'; 

  constructor(private http: HttpClient) {}

  getAllTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${this.apiUrl}/all`);
  }

  getTechnicianById(id: number): Observable<Technician> {
    return this.http.get<Technician>(`${this.apiUrl}/get/${id}`);
  }

  updateTechnician(id: number, technician: Technician): Observable<Technician> {
    return this.http.put<Technician>(`${this.apiUrl}/update/${id}`, technician);
  }

  deleteTechnician(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
