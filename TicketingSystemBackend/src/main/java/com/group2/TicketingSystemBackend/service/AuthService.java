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

        // Add new student
        return studentRepository.save(newAccount);
    }

    // log in as Student
    public User login(User existingUser) {
        // Find user by email
        Optional<User> optUser = userRepository.findByEmail(existingUser.getEmail());
        if (optUser.isEmpty()) {
            return null;
        }

        User user = optUser.get();

        // Check user type and password
        if (!user.getPassword().equals(existingUser.getPassword())) {
            return null;
        }

        return user;
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

    // Check if student is valid
    public boolean isValidStudent(Student possiblyValidUserAccount) {
        // Check if non-null
        if (possiblyValidUserAccount == null)
            return false;

        Optional<Student> studentAccount = studentRepository.findByEmail(possiblyValidUserAccount.getEmail());

        return studentAccount.isPresent();
    }
}