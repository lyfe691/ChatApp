package com.ybdd.ChatApp.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendResetTokenEmail(String toEmail, String token) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        // email that the user receives
        String htmlContent = "<!DOCTYPE html>"
                + "<html lang='en'>"
                + "<head>"
                + "    <meta charset='UTF-8'>"
                + "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "    <title>Password Reset</title>"
                + "</head>"
                + "<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>"
                + "    <table role='presentation' style='width: 100%; border-collapse: collapse;'>"
                + "        <tr>"
                + "            <td align='center' style='padding: 40px 0;'>"
                + "                <table role='presentation' style='width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>"
                + "                    <!-- Header -->"
                + "                    <tr>"
                + "                        <td style='padding: 40px 30px; background-color: #007bff; text-align: center;'>"
                + "                            <h1 style='color: #ffffff; font-size: 28px; margin: 0;'>Password Reset Request</h1>"
                + "                        </td>"
                + "                    </tr>"
                + "                    <!-- Content -->"
                + "                    <tr>"
                + "                        <td style='padding: 40px 30px;'>"
                + "                            <p style='font-size: 16px; line-height: 1.6; color: #333333; margin-bottom: 20px;'>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>"
                + "                            <p style='font-size: 16px; line-height: 1.6; color: #333333; margin-bottom: 30px;'>To reset your password, click the button below:</p>"
                + "                            <table role='presentation' style='margin: 0 auto;'>"
                + "                                <tr>"
                + "                                    <td style='border-radius: 4px; background-color: #007bff;'>"
                + "                                        <a href='http://localhost:8080/reset-password?token=" + token + "' style='display: inline-block; padding: 14px 30px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold;'>Reset Password</a>"
                + "                                    </td>"
                + "                                </tr>"
                + "                            </table>"
                + "                            <p style='font-size: 14px; line-height: 1.6; color: #666666; margin-top: 30px;'>If the button doesn't work, copy and paste this link into your browser:</p>"
                + "                            <p style='font-size: 14px; word-break: break-all; color: #007bff;'><a href='http://localhost:8080/reset-password?token=" + token + "' style='color: #007bff; text-decoration: none;'>http://localhost:8080/reset-password?token=" + token + "</a></p>"
                + "                        </td>"
                + "                    </tr>"
                + "                    <!-- Footer -->"
                + "                    <tr>"
                + "                        <td style='padding: 30px; background-color: #f8f8f8; text-align: center;'>"
                + "                            <p style='font-size: 14px; color: #999999; margin: 0;'>This is an automated message, please do not reply.</p>"
                + "                            <p style='font-size: 14px; color: #999999; margin: 10px 0 0;'>© 2024 ChatApp. All rights reserved.</p>"
                + "                        </td>"
                + "                    </tr>"
                + "                </table>"
                + "            </td>"
                + "        </tr>"
                + "    </table>"
                + "</body>"
                + "</html>";

        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }
}
