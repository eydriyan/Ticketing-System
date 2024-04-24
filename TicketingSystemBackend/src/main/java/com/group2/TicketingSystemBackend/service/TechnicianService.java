package com.group2.TicketingSystemBackend.service;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.User;
import com.group2.TicketingSystemBackend.repository.TechnicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TechnicianService {
    @Autowired
    private TechnicianRepository technicianRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    // create a technician
    public Technician createTechnician(Technician newAccount) {
        // Check for duplicate email
        Optional<Technician> opt_account = technicianRepository.findByEmail(newAccount.getEmail());
        if (opt_account.isPresent())
            return null;

        newAccount.setPassword(passwordEncoder.encode(newAccount.getPassword()));

        // Add new student
        return technicianRepository.save(newAccount);
    }

    // get all technicians
    public List<Technician> getAllTechnicians() {
        return (List<Technician>) technicianRepository.findAll();
    }

    // get technician by id
    public Technician getTechnicianById(Long technicianId) {
        Optional<Technician> technicianOptional = technicianRepository.findById(technicianId);
        return technicianOptional.orElseThrow(() -> new RuntimeException("Technician not found with ID: " + technicianId));
    }

    // update technician by id
    public Technician updateTechnician(Long technicianId, Technician updatedTechnician) {
        Technician existingTechnician = getTechnicianById(technicianId);

        // Update fields of the existing technician with values from updatedTechnician
        existingTechnician.setFirstName(updatedTechnician.getFirstName());
        existingTechnician.setLastName(updatedTechnician.getLastName());
        existingTechnician.setEmail(updatedTechnician.getEmail());
        existingTechnician.setPhoneNumber(updatedTechnician.getPhoneNumber());
        existingTechnician.setAvailability(updatedTechnician.getAvailability());
        existingTechnician.setSkillSet(updatedTechnician.getSkillSet());

        return technicianRepository.save(existingTechnician);
    }

    // delete technician by id
    public void deleteTechnician(Long technicianId) {
        Technician technician = getTechnicianById(technicianId);
        technicianRepository.delete(technician);
    }

    // get technician by email
    public Technician getTechnicianByEmail(String email) {
        Optional<Technician> technicianOptional = technicianRepository.findByEmail(email);
        return technicianOptional.orElseThrow(() -> new RuntimeException("Technician not found with email: " + email));
    }
}
