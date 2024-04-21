package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.Ticket;
import com.group2.TicketingSystemBackend.service.TechnicianService;
import com.group2.TicketingSystemBackend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/technician")
public class TechnicianController {
    @Autowired
    private TechnicianService technicianService;
    @Autowired
    private TicketService ticketService;

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

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> deleteTechnician(@PathVariable Long id) {
//        technicianService.deleteTechnician(id);
//        return ResponseEntity.noContent().build();
//    }
}
