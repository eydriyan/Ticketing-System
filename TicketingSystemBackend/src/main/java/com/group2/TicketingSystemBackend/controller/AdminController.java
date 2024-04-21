package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.Ticket;
import com.group2.TicketingSystemBackend.service.TechnicianService;
import com.group2.TicketingSystemBackend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    @Autowired
    private TicketService ticketService;
    @Autowired
    private TechnicianService technicianService;

    //Assign technician to a ticket
    @PostMapping("/assign-technician/{ticketId}")
    public ResponseEntity<Ticket> assignTechnicianToTicket(
            @PathVariable Long ticketId,
            @RequestParam String technicianEmail
    ) {
        Ticket assignedTicket = ticketService.assignTechnicianToTicket(ticketId, technicianEmail);
        return ResponseEntity.ok(assignedTicket);
    }

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
}
