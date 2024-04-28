package com.group2.TicketingSystemBackend.repository;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Verification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationCodeRepository extends CrudRepository<Verification, Long> {
    @Query("SELECT verify FROM Verification verify WHERE verify.student = ?1")
    Optional<Verification> findVerificationCodeByStudent(Student student);
}
