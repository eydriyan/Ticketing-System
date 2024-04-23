package com.group2.TicketingSystemBackend.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class loginDTO {
    private String token;
}
