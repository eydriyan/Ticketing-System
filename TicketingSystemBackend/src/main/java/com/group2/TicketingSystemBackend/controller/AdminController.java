package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Ticket;
import com.group2.TicketingSystemBackend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    @Autowired
    private TicketService ticketService;

    @PostMapping("/assign-technician/{ticketId}")
    public ResponseEntity<Ticket> assignTechnicianToTicket(
            @PathVariable Long ticketId,
            @RequestParam String technicianEmail
    ) {
        Ticket assignedTicket = ticketService.assignTechnicianToTicket(ticketId, technicianEmail);
        return ResponseEntity.ok(assignedTicket);
    }
}
