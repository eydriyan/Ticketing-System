package com.group2.TicketingSystemBackend.service;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student getStudentById(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        return studentOptional.orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
    }

    public Student getStudentByEmail(String email) {
        Optional<Student> studentOptional = studentRepository.findByEmail(email);
        return studentOptional.orElseThrow(() -> new RuntimeException("Student not found with ID: " + email));
    }
}
