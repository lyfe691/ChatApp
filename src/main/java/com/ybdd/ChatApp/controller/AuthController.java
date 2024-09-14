package com.ybdd.ChatApp.controller;

import com.ybdd.ChatApp.model.PasswordResetToken;
import com.ybdd.ChatApp.model.User;
import com.ybdd.ChatApp.service.UserService;
import com.ybdd.ChatApp.repository.PasswordResetTokenRepository;
import com.ybdd.ChatApp.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Controller
public class AuthController {

    private final UserService userService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    @Autowired
    public AuthController(UserService userService,
                          PasswordResetTokenRepository passwordResetTokenRepository,
                          EmailService emailService) {
        this.userService = userService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
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
            return "redirect:/login";
        } catch (RuntimeException e) {
            model.addAttribute("error", "Username or email already taken.");
            return "register";
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
}
