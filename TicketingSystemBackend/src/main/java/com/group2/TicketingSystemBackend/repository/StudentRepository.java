package com.group2.TicketingSystemBackend.repository;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
}
