package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.Ticket;
import com.group2.TicketingSystemBackend.model.User;
import com.group2.TicketingSystemBackend.service.AuthService;
import com.group2.TicketingSystemBackend.service.StudentService;
import com.group2.TicketingSystemBackend.service.TechnicianService;
import com.group2.TicketingSystemBackend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private TechnicianService technicianService;
    @Autowired
    private AuthService authService;

    // add ticket
    @PostMapping("/add-ticket")
    public ResponseEntity<Ticket> addTicket(
            @RequestHeader(name = "email", required = false) String email,
            @RequestParam("category") String category,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("priority") String priority
    ) {
        Ticket ticket = new Ticket();

        ticket.setCategory(category);
        ticket.setTitle(title);
        ticket.setDescription(description);
        ticket.setPriority(priority);

        Student reqStudent = studentService.getStudentByEmail(email);

        if (!authService.isValidStudent(reqStudent)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        ticket.setStudent(reqStudent);

        Ticket createdTicket = ticketService.addTicket(ticket);
        return ResponseEntity.ok(createdTicket);
    }

    // get all tickets
    @GetMapping("/all")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }

    // get ticket by id
    @GetMapping("/get/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicketById(id);
        return ResponseEntity.ok(ticket);
    }

    // update ticket by id
    @PutMapping("/update/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket updatedTicket) {
        Ticket ticket = ticketService.updateTicket(id, updatedTicket);
        return ResponseEntity.ok(ticket);
    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
//        ticketService.deleteTicket(id);
//        return ResponseEntity.noContent().build();
//    }

    // get tickets of a specific student
    @GetMapping("/student-tickets/{studentId}")
    public ResponseEntity<List<Ticket>> getTicketsByStudentId(@PathVariable Long studentId) {
        Student student = studentService.getStudentById(studentId);
        List<Ticket> tickets = ticketService.getTicketsByStudent(student);
        return ResponseEntity.ok(tickets);
    }

    // get tickets assigned to a specific technician
    @GetMapping("/technician-tickets/{technicianId}")
    public ResponseEntity<List<Ticket>> getTicketsByTechnicianId(@PathVariable Long technicianId) {
        Technician technician = technicianService.getTechnicianById(technicianId);
        List<Ticket> tickets = ticketService.getTicketsByTechnician(technician);
        return ResponseEntity.ok(tickets);
    }

    // mark ticket as resolved
    @PostMapping("/resolve/{ticketId}")
    public ResponseEntity<Ticket> markTicketResolved(@PathVariable Long ticketId) {
        Ticket resolvedTicket = ticketService.markTicketResolved(ticketId);
        return ResponseEntity.ok(resolvedTicket);
    }

    // get resolved student tickets

    // get resolved tickets associated to technician
}
