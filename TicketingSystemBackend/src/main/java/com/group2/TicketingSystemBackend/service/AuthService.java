package com.group2.TicketingSystemBackend.service;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.User;
import com.group2.TicketingSystemBackend.repository.StudentRepository;
import com.group2.TicketingSystemBackend.repository.TechnicianRepository;
import com.group2.TicketingSystemBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TechnicianRepository technicianRepository;
    @Autowired
    private UserRepository userRepository;

    // Sign up
    public Student signUp(Student newAccount) {
        // Check for duplicate email
        Optional<Student> opt_account = studentRepository.findByEmail(newAccount.getEmail());
        if (opt_account.isPresent())
            return null;

        // Add and return
        return studentRepository.save(newAccount);
    }

//    public User signUp(Technician newAccount) {
//        // Check for duplicate email
//        Optional<Technician> opt_account = technicianRepository.findByEmail(newAccount.getEmail());
//        if (opt_account.isPresent())
//            return null;
//
//        // Add and return
//        return technicianRepository.save(newAccount);
//    }

    // log in
    public User login(User existingAccount) {
        // Check if email exists
        Optional<User> opt_account = userRepository.findByEmail(existingAccount.getEmail());
        if (opt_account.isEmpty())
            return null;

        // No Empty Passwords
        if (existingAccount.getPassword().isEmpty()) {
            return null;
        }

        User user = opt_account.get();

        // Compare Passwords
        if (!user.getPassword().equals(existingAccount.getPassword())) {
            return null;
        }

        return userRepository.save(user);
    }

    // Log out
    public User logout(Student existingAccount) {
        // Check if email exists
        Optional<Student> opt_account = studentRepository.findByEmail(existingAccount.getEmail());
        if (opt_account.isEmpty())
            return null;

        Student student = opt_account.get();

        return studentRepository.save(student);
    }

    // check if user is admin
    public boolean isAdmin(User possiblyAdminAccount) {
        // Check if non-null
        if (possiblyAdminAccount == null)
            return false;

        // Check email
        return possiblyAdminAccount.getEmail().equals("admin@gmail.com");
    }

    public boolean isValidUser(User possiblyValidUserAccount) {
        // Check if non-null
        if (possiblyValidUserAccount == null)
            return false;

        Optional<User> userAccount = userRepository.findByEmail(possiblyValidUserAccount.getEmail());

        return userAccount.isPresent();
    }
}