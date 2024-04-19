import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket.model'; 

@Injectable({ providedIn: 'root' })
export class TicketserviceService {
  private apiUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  addTicket(ticket: Ticket, studentEmail: string): Observable<Ticket> { 
    const headers = new HttpHeaders({ email: studentEmail });  
    return this.http.post<Ticket>(`${this.apiUrl}/add-ticket`, ticket, { headers });
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/all`);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/get/${id}`);
  }

  updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/update/${id}`, ticket); 
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`); 
  }

  getTicketsByStudentId(studentId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/student-tickets/${studentId}`);
  }

  assignTechnicianToTicket(ticketId: number, technicianEmail: string): Observable<Ticket> { 
    // You will likely need to implement the necessary logic to send the ticketId and 
    // technicianEmail to a dedicated endpoint on your Spring Boot backend
    return this.http.post<Ticket>(`${this.apiUrl}/assign-technician`, { ticketId, technicianEmail }); 
  }
}
