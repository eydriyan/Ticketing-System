package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.Ticket;
import com.group2.TicketingSystemBackend.service.TechnicianService;
import com.group2.TicketingSystemBackend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/technicians")
public class TechnicianController {
    @Autowired
    private TechnicianService technicianService;
    @Autowired
    private TicketService ticketService;

    // create technician
    @PostMapping("/create-technician")
    public ResponseEntity<Technician> createTechnician(@RequestBody Technician newUser) {
        // Create a new Technician entity
        Technician technician = new Technician();

        Technician createdTechnician = technicianService.createTechnician(newUser);
        if (createdTechnician == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(createdTechnician);
    }

    @GetMapping("/my-tickets")
    public ResponseEntity<List<Ticket>> getTicketsOfLoggedInTechnician(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userEmail = authentication.getName(); // Get the email of the authenticated user
        Technician technician = technicianService.getTechnicianByEmail(userEmail);

        if (technician == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // User not found
        }

        List<Ticket> tickets = ticketService.getTicketsByTechnician(technician);
        return ResponseEntity.ok(tickets);
    }

    // get all technician
    @GetMapping("/all")
    public ResponseEntity<List<Technician>> getAllTechnicians() {
        List<Technician> technicians = technicianService.getAllTechnicians();
        return ResponseEntity.ok(technicians);
    }

    // technician by id
    @GetMapping("/get/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable Long id) {
        Technician technician = technicianService.getTechnicianById(id);
        return ResponseEntity.ok(technician);
    }

    // update technician by id
    @PutMapping("/update/{id}")
    public ResponseEntity<Technician> updateTechnician(@PathVariable Long id, @RequestBody Technician updatedTechnician) {
        Technician technician = technicianService.updateTechnician(id, updatedTechnician);
        return ResponseEntity.ok(technician);
    }

    @PostMapping("/assign-to-self/{ticketId}")
    public ResponseEntity<Ticket> assignTicketToSelf(
            @PathVariable Long ticketId,
            @RequestParam String technicianEmail
    ) {
        Ticket assignedTicket = ticketService.assignTicketToSelf(ticketId, technicianEmail);
        return ResponseEntity.ok(assignedTicket);
    }

    // Assign ticket to the currently logged-in technician




//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> deleteTechnician(@PathVariable Long id) {
//        technicianService.deleteTechnician(id);
//        return ResponseEntity.noContent().build();
//    }
}
