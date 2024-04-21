package com.group2.TicketingSystemBackend.repository;

import com.group2.TicketingSystemBackend.model.Admin;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AdminRepository extends CrudRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}
