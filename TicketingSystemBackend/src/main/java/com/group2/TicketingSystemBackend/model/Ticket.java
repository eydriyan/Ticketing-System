    package com.group2.TicketingSystemBackend.model;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.LocalDate;

    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Table(name = "Tickets")
    public class Ticket {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private String category;
        @ManyToOne
        @JoinColumn(name = "student_id")
        private Student student;

        @ManyToOne
        @JoinColumn(name = "technician_id")
        private Technician technician;
        private String title;
        private String description;
        private String priority;
        private String status;
        private LocalDate dateCreated;
        private LocalDate dateResolved;
    }
