import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technician } from '../model/technician.model';
import { Ticket } from '../model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:18080/api/admin';

  constructor(private http: HttpClient) { }

  assignTechnicianToTicket(ticketId: number, technicianEmail: string): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/assign-technician/${ticketId}?technicianEmail=${technicianEmail}`, {});
  }

  createTechnician(newTechnician: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${this.apiUrl}/create-technician`, newTechnician);
  }
}
