package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/technicians")
public class TechnicianController {
    @Autowired
    private TechnicianService technicianService;

    @GetMapping("/all")
    public ResponseEntity<List<Technician>> getAllTechnicians() {
        List<Technician> technicians = technicianService.getAllTechnicians();
        return ResponseEntity.ok(technicians);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable Long id) {
        Technician technician = technicianService.getTechnicianById(id);
        return ResponseEntity.ok(technician);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Technician> updateTechnician(@PathVariable Long id, @RequestBody Technician updatedTechnician) {
        Technician technician = technicianService.updateTechnician(id, updatedTechnician);
        return ResponseEntity.ok(technician);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTechnician(@PathVariable Long id) {
        technicianService.deleteTechnician(id);
        return ResponseEntity.noContent().build();
    }
}
