package com.group2.TicketingSystemBackend.service;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.Ticket;
import com.group2.TicketingSystemBackend.model.User;
import com.group2.TicketingSystemBackend.repository.TechnicianRepository;
import com.group2.TicketingSystemBackend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private TechnicianRepository technicianRepository;

    // add ticket
    public Ticket addTicket(Ticket ticket) {
        if (ticket.getStatus() == null) {
            ticket.setStatus("Pending");
        }

        ticket.setDateCreated(LocalDate.now());

        return ticketRepository.save(ticket);
    }

    // get all tickets
    public List<Ticket> getAllTickets() {
        return (List<Ticket>) ticketRepository.findAll();
    }

    // get ticket by id
    public Ticket getTicketById(Long ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticketId));
    }

    // update ticket by id
    public Ticket updateTicket(Long ticketId, Ticket updatedTicket) {
        Ticket existingTicket = getTicketById(ticketId);

        // Update fields of the existing ticket with values from updatedTicket
        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setPriority(updatedTicket.getPriority());
        existingTicket.setStatus(updatedTicket.getStatus());
        //existingTicket.setDateResolved(updatedTicket.getDateResolved());

        return ticketRepository.save(existingTicket);
    }

    // delete ticket by id
    public void deleteTicket(Long ticketId) {
        Ticket ticket = getTicketById(ticketId);
        ticketRepository.delete(ticket);
    }

    // get ticket by student
    public List<Ticket> getTicketsByStudent(Student student) {
        return ticketRepository.findByStudent(student);
    }

    // assign ticket to technician
    public Ticket assignTechnicianToTicket(Long ticketId, String technicianEmail) {
        Ticket ticket = getTicketById(ticketId);

        Technician technician = technicianRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new RuntimeException("Technician not found with email: " + technicianEmail));

        ticket.setTechnician(technician);
        ticket.setStatus("Assigned");

        return ticketRepository.save(ticket);
    }

}
