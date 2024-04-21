package com.group2.TicketingSystemBackend.controller;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.User;
import com.group2.TicketingSystemBackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Student sign up
    @PostMapping("/signup")
    public ResponseEntity<Student> signUpAsStudent(@RequestBody Student newUser) {
        // Create a new Student entity
        Student student = new Student();

        // Sign up the user (which now includes a student)
        Student createdUser = authService.signUp(newUser);
        if (createdUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(createdUser);
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        User loggedInUser = authService.login(loginUser);

        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(loggedInUser);
    }

    //Log out
    @PostMapping("/logout")
    public ResponseEntity<User> logout(@RequestBody Student existingUser) {
        User loggedOutUser = authService.logout(existingUser);
        if (loggedOutUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(loggedOutUser);
    }
}