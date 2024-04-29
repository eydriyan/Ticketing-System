package com.group2.TicketingSystemBackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    public String senderEmail;
    @Value("${app.admin.email}")
    public String adminEmail;

    @Async
    private void sendCustomMail(String receipientEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(receipientEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    @Async
    public void sendNewTicketNotification() {
        String notificationMessage = "A new ticket has been added. Please check the system for details.";
        sendCustomMail(adminEmail, "New Ticket Notification", notificationMessage);
    }

    @Async
    public void sendTicketAssignedNotification(String technicianEmail, String title) {
        String notificationMessage = "A new ticket has been assigned to you. Ticket title: " + title;
        sendCustomMail(technicianEmail, "New Ticket Assignment", notificationMessage);
    }

    @Async
    public void sendTicketResolvedNotification(String studentEmail, String title) {
        String notificationMessage = "Your ticket with title " + title + " has been resolved.";
        sendCustomMail(studentEmail, "Ticket Resolved", notificationMessage);
    }

    @Async
    public void sendTicketRejectedNotification(String studentEmail, String title) {
        String notificationMessage = "Your ticket with title " + title + " has been rejected.";
        sendCustomMail(studentEmail, "Ticket Rejected", notificationMessage);
    }

}
