package com.group2.TicketingSystemBackend.service;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.User;
import com.group2.TicketingSystemBackend.repository.StudentRepository;
import com.group2.TicketingSystemBackend.repository.TechnicianRepository;
import com.group2.TicketingSystemBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    public Student signup(Student newAccount) {
        // Check for duplicate email
        Optional<Student> opt_account = studentRepository.findByEmail(newAccount.getEmail());
        if (opt_account.isPresent())
            return null;

        newAccount.setPassword(passwordEncoder.encode(newAccount.getPassword()));

        // Add new student
        return studentRepository.save(newAccount);
    }

    public String login(User existingUser) {
        String token = "";

        // Attempt Authentication
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            existingUser.getEmail(),
                            existingUser.getPassword()
                    )
            );

            // Create JWT
            token = jwtService.generateToken(
                    (UserDetails) authentication.getPrincipal()
            );

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return token;
    }

    // Method to get currently authenticated user's email
    public String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return authentication.getName();
    }

}