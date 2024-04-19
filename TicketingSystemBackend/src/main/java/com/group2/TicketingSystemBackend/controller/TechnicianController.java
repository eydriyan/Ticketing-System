package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/technicians")
public class TechnicianController {
    @Autowired
    private TechnicianService technicianService;

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

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> deleteTechnician(@PathVariable Long id) {
//        technicianService.deleteTechnician(id);
//        return ResponseEntity.noContent().build();
//    }
}
