package com.group2.TicketingSystemBackend.initiaizer;

import com.group2.TicketingSystemBackend.model.Admin;
import com.group2.TicketingSystemBackend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin already exists
        if (adminRepository.findByEmail("admin@gmail.com").isEmpty()) {
            // Create a new admin user
            Admin admin = new Admin();
            admin.setFirstName("Admin");
            admin.setLastName("Admin");
            admin.setPhoneNumber("09999999");
            admin.setEmail("admin@gmail.com");
            admin.setPassword("adminPassword");

            // Save the admin user to the database
            adminRepository.save(admin);

            System.out.println("Admin user created successfully.");
        }
    }
}