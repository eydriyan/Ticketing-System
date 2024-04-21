package com.group2.TicketingSystemBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("TECHNICIAN")
public class Technician extends User{
    private String staffNumber;
    private String skillSet;
    private String availability;
}
