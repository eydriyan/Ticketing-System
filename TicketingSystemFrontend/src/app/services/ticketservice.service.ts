import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket.model';
import { AuthserviceService } from '../services/authservice.service'; 

@Injectable({
  providedIn: 'root'
})

export class TicketserviceService {
  private apiUrl = 'http://localhost:18080/api/ticket';

  constructor(private http: HttpClient, private authService: AuthserviceService) { }

  addTicket(title: string, priority: string, category: string, description: string ): Observable<Ticket> { 
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Construct the request body
    const requestBody = {
      title: title,
      priority: priority,
      category: category,
      description: description
    };
  
    return this.http.post<Ticket>(`${this.apiUrl}/add-ticket`, requestBody, { headers });
  }
  
  getAllTickets(): Observable<Ticket[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Ticket[]>(`${this.apiUrl}/all-tickets`, { headers });
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/get/${id}`);
  }

  updateTicket(id: number, updatedTicket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/update/${id}`, updatedTicket);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getTicketsByStudentId(studentId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/student-tickets/${studentId}`);
  }

  assignTechnicianToTicket(ticketId: number, technicianEmail: string): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/assign-technician`, { ticketId, technicianEmail });
  }

  markTicketResolved(ticketId: number): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/resolve-ticket/${ticketId}`, {});
  }

  getTicketsByTechnicianId(technicianId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/technician-tickets/${technicianId}`);
  }

  getAllResolvedTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/resolved-tickets`);
  }

  getResolvedTicketsByStudentId(studentId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/resolved-student-tickets/${studentId}`);
  }

  getResolvedTicketsByTechnicianId(technicianId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/resolved-technician-tickets/${technicianId}`);
  }
}
