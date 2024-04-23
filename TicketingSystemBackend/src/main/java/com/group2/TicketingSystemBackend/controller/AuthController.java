package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.enums.UserRole;
import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.User;
import com.group2.TicketingSystemBackend.model.dto.loginDTO;
import com.group2.TicketingSystemBackend.service.AuthService;
import com.group2.TicketingSystemBackend.service.EmailService;
import com.group2.TicketingSystemBackend.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/auth")
public class AuthController {

    
    @Autowired
    private AuthService authService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private VerificationService verificationService;

    // Student sign up
    @PostMapping("/signup")
    public ResponseEntity<Student> signUpAsStudent(@RequestBody Student newUser) {
        // Create a new Student entity
        Student student = new Student();

        newUser.setRole(UserRole.STUDENT);

        // Sign up the user (which now includes a student)
        Student createdUser = authService.signup(newUser);

        if (createdUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Send Verification Code
        verificationService.sendVerificationCode(createdUser);
        return ResponseEntity.ok(createdUser);
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<loginDTO> login(@RequestBody User loginUser) {
        String loggedInUser = authService.login(loginUser);

        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(loginDTO.builder().token(loggedInUser).build());
    }

    //Log out
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logout successful");
    }
}