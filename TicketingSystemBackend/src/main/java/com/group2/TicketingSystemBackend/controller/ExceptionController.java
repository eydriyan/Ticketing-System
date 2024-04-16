package com.group2.TicketingSystemBackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<String> handleException (Exception ex) {
        return ResponseEntity
                .status(500)
                .body(
                        ex.getMessage()
                );
    }
}
