package com.group2.TicketingSystemBackend.repository;

import com.group2.TicketingSystemBackend.model.Technician;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TechnicianRepository extends CrudRepository<Technician, Long> {
    Optional<Technician> findByEmail(String email);
}
