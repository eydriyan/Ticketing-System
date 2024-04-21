import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketserviceService {
  private apiUrl = 'http://localhost:18080/api/ticket';

  constructor(private http: HttpClient) { }

  addTicket(category: string, title: string, description: string, priority: string, studentEmail: string): Observable<Ticket> { 
    const headers = new HttpHeaders({ email: studentEmail });
    
    // Using HttpParams to construct query parameters
    let params = new HttpParams()
      .set('category', category)
      .set('title', title)
      .set('description', description)
      .set('priority', priority);
  
    return this.http.post<Ticket>(`${this.apiUrl}/add-ticket`, null, { headers, params });
  }
  
  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/all`);
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
}
