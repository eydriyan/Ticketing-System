package com.group2.TicketingSystemBackend.repository;

import com.group2.TicketingSystemBackend.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
