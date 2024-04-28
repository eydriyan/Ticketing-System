package com.group2.TicketingSystemBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class TicketingSystemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketingSystemBackendApplication.class, args);
	}

}
