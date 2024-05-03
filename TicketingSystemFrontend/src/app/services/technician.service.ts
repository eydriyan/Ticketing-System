import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technician } from '../model/technician.model';
import { Ticket } from '../model/ticket.model';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private baseUrl = 'http://localhost:18080/api/technician'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTicketsForCurrentTechnician(): Observable<Ticket[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Ticket[]>(`${this.baseUrl}/my-tickets`, { headers });
  }

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
