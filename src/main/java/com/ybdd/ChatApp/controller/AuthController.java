package com.ybdd.ChatApp.controller;

import com.ybdd.ChatApp.model.PasswordResetToken;
import com.ybdd.ChatApp.model.EmailVerificationToken;
import com.ybdd.ChatApp.model.User;
import com.ybdd.ChatApp.service.UserService;
import com.ybdd.ChatApp.repository.PasswordResetTokenRepository;
import com.ybdd.ChatApp.repository.EmailVerificationTokenRepository;
import com.ybdd.ChatApp.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Controller
public class AuthController {

    private final UserService userService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final EmailService emailService;

    @Autowired
    public AuthController(UserService userService,
                          PasswordResetTokenRepository passwordResetTokenRepository,
                          EmailVerificationTokenRepository emailVerificationTokenRepository,
                          EmailService emailService) {
        this.userService = userService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.emailService = emailService;
    }
    // Registration endpoint
    @GetMapping("/register")
    public String showRegistrationPage(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, Model model) {
        try {
            userService.registerNewUser(user.getUsername(), user.getEmail(), user.getPassword());

            // Generate email verification token
            String token = UUID.randomUUID().toString();
            EmailVerificationToken verificationToken = new EmailVerificationToken(token, user.getEmail(), LocalDateTime.now().plusHours(24));
            emailVerificationTokenRepository.save(verificationToken);

            // Send verification email
            String verificationLink = "http://localhost:8080/verify-email?token=" + token;
            emailService.sendEmailVerificationToken(user.getEmail(), verificationLink);

            model.addAttribute("message", "Email verification link sent to your email.");
            return "register";
        } catch (MessagingException e) {
            model.addAttribute("error", "Failed to send verification email.");
            return "register";
        } catch (RuntimeException e) {
            model.addAttribute("error", "Username or email already taken.");
            return "register";
        }
    }
    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @GetMapping("/verify-email")
    public String verifyEmail(@RequestParam("token") String token, Model model) {
        Optional<EmailVerificationToken> verificationToken = emailVerificationTokenRepository.findByToken(token);

        if (!verificationToken.isPresent() || verificationToken.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            logger.error("Verification token is invalid or expired.");
            model.addAttribute("error", "Invalid or expired verification link.");
            return "login";
        }

        Optional<User> user = userService.findByEmail(verificationToken.get().getUserEmail());
        if (user.isPresent()) {
            User userToUpdate = user.get();
            userToUpdate.setEnabled(true);  // Enable the user account
            logger.info("Enabling user: " + userToUpdate.getEmail());
            userService.saveUser(userToUpdate);
            logger.info("User enabled and saved.");
            emailVerificationTokenRepository.deleteByUserEmail(userToUpdate.getEmail());
            model.addAttribute("message", "Email verified successfully. You can now log in.");
            return "login";
        } else {
            logger.error("User not found for email: " + verificationToken.get().getUserEmail());
            model.addAttribute("error", "User not found.");
            return "login";
        }
    }

    // Login endpoint
    @GetMapping("/login")
    public String showLoginPage(Model model, @RequestParam(value = "error", required = false) String error) {
        if (error != null) {
            model.addAttribute("error", "Invalid username/email or password.");
        }
        return "login";
    }

    // Forgot Password endpoint
    @GetMapping("/forgot-password")
    public String showForgotPasswordPage() {
        return "forgot-password";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam("email") String email, Model model) {
        Optional<User> user = userService.findByEmail(email);
        if (!user.isPresent()) {
            model.addAttribute("error", "Email not found.");
            return "forgot-password";
        }

        // Generate a reset token
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, email, LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(resetToken);

        // Send an email with the token
        try {
            emailService.sendResetTokenEmail(email, token);
        } catch (Exception e) {
            model.addAttribute("error", "Failed to send reset email. Please try again later.");
            return "forgot-password";
        }

        model.addAttribute("message", "Password reset link sent to your email.");
        return "forgot-password";
    }

    // Reset Password endpoint
    @GetMapping("/reset-password")
    public String showResetPasswordPage(@RequestParam("token") String token, Model model) {
        Optional<PasswordResetToken> resetToken = passwordResetTokenRepository.findByToken(token);
        if (!resetToken.isPresent() || resetToken.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            model.addAttribute("error", "Invalid or expired token.");
            return "reset-password";
        }

        model.addAttribute("token", token);
        return "reset-password";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam("token") String token,
                                @RequestParam("password") String password,
                                Model model) {
        Optional<PasswordResetToken> resetToken = passwordResetTokenRepository.findByToken(token);
        if (!resetToken.isPresent() || resetToken.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            model.addAttribute("error", "Invalid or expired token.");
            return "reset-password";
        }

        Optional<User> user = userService.findByEmail(resetToken.get().getUserEmail());
        if (user.isPresent()) {
            User userToUpdate = user.get();
            userToUpdate.setPassword(userService.encodePassword(password));
            userService.saveUser(userToUpdate);

            passwordResetTokenRepository.deleteByUserEmail(resetToken.get().getUserEmail());
            return "redirect:/login";
        }

        model.addAttribute("error", "Something went wrong.");
        return "reset-password";
    }

    // Theme preferences
    @PostMapping("/theme")
    @ResponseBody
    public String updateThemePreference(Authentication authentication, @RequestParam String theme) {
        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setThemePreference(theme);
        userService.saveUser(user);
        return "Theme preference updated successfully!";
    }

    @GetMapping("/theme")
    @ResponseBody
    public String getThemePreference(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getThemePreference();
    }

    @PostMapping("/change-email")
    @ResponseBody
    public ResponseEntity<String> changeEmail(Authentication authentication,
                                              @RequestParam String currentEmail,
                                              @RequestParam String newEmail,
                                              @RequestParam String confirmNewEmail,
                                              @RequestParam String password) {
        Logger logger = LoggerFactory.getLogger(AuthController.class);

        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if current email matches
        if (!user.getEmail().equals(currentEmail)) {
            logger.error("Email mismatch: Provided email {} does not match user email {}", currentEmail, user.getEmail());
            return ResponseEntity.badRequest().body("Current email does not match.");
        }

        // Check if new email and confirmation match
        if (!newEmail.equals(confirmNewEmail)) {
            logger.error("New email mismatch: {} and {} do not match", newEmail, confirmNewEmail);
            return ResponseEntity.badRequest().body("New email and confirmation do not match.");
        }

        // Validate password
        if (!userService.isPasswordValid(user, password)) {
            logger.error("Password validation failed for user {}", username);
            return ResponseEntity.badRequest().body("Invalid password.");
        }

        // Update email
        user.setEmail(newEmail);
        userService.saveUser(user);
        logger.info("Email updated successfully for user {}", username);

        return ResponseEntity.ok("Email updated successfully!");
    }

    // Change Password
    @PostMapping("/change-password")
    @ResponseBody
    public ResponseEntity<String> changePassword(Authentication authentication,
                                                 @RequestParam String currentPassword,
                                                 @RequestParam String newPassword,
                                                 @RequestParam String confirmNewPassword) {
        Logger logger = LoggerFactory.getLogger(AuthController.class);

        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate current password
        if (!userService.isPasswordValid(user, currentPassword)) {
            logger.error("Password validation failed for user {}", username);
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // Check if new password and confirmation match
        if (!newPassword.equals(confirmNewPassword)) {
            logger.error("New password mismatch: {} and {} do not match", newPassword, confirmNewPassword);
            return ResponseEntity.badRequest().body("New password and confirmation do not match.");
        }

        // Update password
        user.setPassword(userService.encodePassword(newPassword));
        userService.saveUser(user);
        logger.info("Password updated successfully for user {}", username);

        return ResponseEntity.ok("Password updated successfully!");
    }

}
