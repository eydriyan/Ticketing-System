package com.group2.TicketingSystemBackend.service;

import com.group2.TicketingSystemBackend.model.Admin;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    // get technician by ID
    public Admin getAdminByEmail(String email) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        return adminOptional.orElseThrow(() -> new RuntimeException("Technician not found with email: " + email));
    }
}
