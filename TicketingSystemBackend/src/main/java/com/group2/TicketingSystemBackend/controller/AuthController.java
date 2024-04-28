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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/user")
    public ResponseEntity<User> getUser(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    //Log out
    @PostMapping("/logout")
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}