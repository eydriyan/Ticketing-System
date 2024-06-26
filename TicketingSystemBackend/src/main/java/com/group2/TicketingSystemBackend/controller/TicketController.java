package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.*;
import com.group2.TicketingSystemBackend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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
    @Autowired
    private AdminService adminService;
    @Autowired
    private EmailService emailService;

    // Add new ticket
    @PostMapping("/add-ticket")
    public ResponseEntity<Ticket> addTicket(
            @RequestBody Ticket newTicket,
            @RequestHeader(name = "Authorization") String token
    ) {
        String currentUserEmail = authService.getCurrentUserEmail();
        if (currentUserEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Student student = studentService.getStudentByEmail(currentUserEmail);
        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Associate the student with the new ticket
        newTicket.setStudent(student);

        // Send notification to admin
        emailService.sendNewTicketNotification();

        // Add the ticket
        Ticket createdTicket = ticketService.addTicket(newTicket);
        return ResponseEntity.ok(createdTicket);
    }

    // get all tickets
    @GetMapping("/all-tickets")
    public ResponseEntity<List<Ticket>> getAllTickets(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userEmail = authentication.getName(); // Get the email of the authenticated user
        Admin admin = adminService.getAdminByEmail(userEmail);

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // User not found
        }

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
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(ticket);
    }

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
    @PostMapping("/resolve-ticket/{ticketId}")
    public ResponseEntity<Ticket> markTicketResolved(@PathVariable Long ticketId) {
        Ticket resolvedTicket = ticketService.markTicketResolved(ticketId);
        emailService.sendTicketResolvedNotification(resolvedTicket.getStudent().getEmail(), resolvedTicket.getTitle());
        return ResponseEntity.ok(resolvedTicket);
    }

    // mark ticket as rejected
    @PostMapping("/reject-ticket/{ticketId}")
    public ResponseEntity<Ticket> markTicketRejected(@PathVariable Long ticketId) {
        Ticket rejectedTicket = ticketService.markTicketRejected(ticketId);
        emailService.sendTicketRejectedNotification(rejectedTicket.getStudent().getEmail(), rejectedTicket.getTitle());
        return ResponseEntity.ok(rejectedTicket);
    }

    // get all resolved tickets (for admin history)
    @GetMapping("/resolved-tickets")
    public ResponseEntity<List<Ticket>> getAllResolvedTickets() {
        List<Ticket> resolvedTickets = ticketService.getAllResolvedTickets();
        return ResponseEntity.ok(resolvedTickets);
    }

    // get resolved tickets associated to a student (for student history)
    @GetMapping("/resolved-student-tickets/{studentId}")
    public ResponseEntity<List<Ticket>> getResolvedTicketsByStudentId(@PathVariable Long studentId) {
        Student student = new Student();
        student.setId(studentId);

        List<Ticket> resolvedTickets = ticketService.getResolvedTicketsByStudent(student);
        return ResponseEntity.ok(resolvedTickets);
    }

    // get resolved tickets associated to technician (for technician history)
    @GetMapping("/resolved-technician-tickets/{technicianId}")
    public ResponseEntity<List<Ticket>> getResolvedTicketsByTechnicianId(@PathVariable Long technicianId) {
        Technician technician = new Technician();
        technician.setId(technicianId);

        List<Ticket> resolvedTickets = ticketService.getResolvedTicketsByTechnician(technician);
        return ResponseEntity.ok(resolvedTickets);
    }

    // Delete Ticket
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
}