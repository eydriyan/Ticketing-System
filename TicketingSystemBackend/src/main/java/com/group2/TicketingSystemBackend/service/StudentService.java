package com.group2.TicketingSystemBackend.service;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Ticket;
import com.group2.TicketingSystemBackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    // get all students
    public List<Student> getAllStudents() {
        return (List<Student>) studentRepository.findAll();
    }

    // get student by id
    public Student getStudentById(Long studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        return studentOptional.orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
    }

    // update student by id
    public Student updateStudent(Long studentId, Student updatedStudent) {
        Student existingStudent = getStudentById(studentId);

        // Update fields of the existing student with values from updatedStudent
        existingStudent.setFirstName(updatedStudent.getFirstName());
        existingStudent.setLastName(updatedStudent.getLastName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setProgram(updatedStudent.getProgram());
        existingStudent.setPhoneNumber(updatedStudent.getPhoneNumber());

        return studentRepository.save(existingStudent);
    }

    // delete student by id
    public void deleteStudent(Long studentId) {
        Student student = getStudentById(studentId);
        studentRepository.delete(student);
    }

    // get student by email
    public Student getStudentByEmail(String email) {
        Optional<Student> studentOptional = studentRepository.findByEmail(email);
        return studentOptional.orElseThrow(() -> new RuntimeException("Student not found with email: " + email));
    }
}
