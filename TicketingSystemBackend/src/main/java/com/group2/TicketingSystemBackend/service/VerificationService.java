package com.group2.TicketingSystemBackend.service;

import java.security.SecureRandom;

import com.group2.TicketingSystemBackend.model.Student;
import com.group2.TicketingSystemBackend.model.Verification;
import com.group2.TicketingSystemBackend.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationService {

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Autowired
    private EmailService emailService;

    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder result = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }
        return result.toString();
    }

    public void sendVerificationCode(Student student) {

        // Generate code
        String code = generateRandomString(5);

        // Send email
        emailService.sendVerificationMail(student.getEmail(), code);

        // Add to verification table
        verificationCodeRepository.save(
                Verification.builder()
                        .student(student)
                        .code(code)
                        .build()
        );
    }

    public boolean attemptVerifyCode(Student student, String code) {
        // Check user from repository
        Verification verificationCode = verificationCodeRepository.findVerificationCodeByStudent(student).orElseThrow();

        // Check code
        return verificationCode.getCode().equals(code);
    }
}