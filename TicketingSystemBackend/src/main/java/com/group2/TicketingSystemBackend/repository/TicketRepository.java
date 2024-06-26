package com.group2.TicketingSystemBackend.repository;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Technician;
import com.group2.TicketingSystemBackend.model.Ticket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {
    List<Ticket> findByStudent(Student student);

    List<Ticket> findByTechnician(Technician technician);

    List<Ticket> findByStatus(String resolved);

    List<Ticket> findByStudentAndStatus(Student student, String status);

    List<Ticket> findByTechnicianAndStatus(Technician technician, String status);
}
