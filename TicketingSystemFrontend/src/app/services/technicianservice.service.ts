import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technician } from '../model/technician.model';

@Injectable({ providedIn: 'root' })
export class TechnicianserviceService {
  private baseUrl = 'http://localhost:18080/api/technicians'; 

  constructor(private http: HttpClient) {}

  createTechnician(newTechnician: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${this.baseUrl}/create-technician`, newTechnician);
  }

  getAllTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${this.baseUrl}/all`);
  }

  getTechnicianById(id: number): Observable<Technician> {
    return this.http.get<Technician>(`${this.baseUrl}/get/${id}`);
  }

  updateTechnician(id: number, updatedTechnician: Technician): Observable<Technician> {
    return this.http.put<Technician>(`${this.baseUrl}/update/${id}`, updatedTechnician);
  }

  deleteTechnician(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
