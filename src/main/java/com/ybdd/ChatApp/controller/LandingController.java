package com.ybdd.ChatApp.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// if the user already has an account and is authenticated, skip landing page.
@Controller
public class LandingController {

    @GetMapping("/")
    public String showLandingPage(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return "redirect:/chat";
        }
        return "landing";
    }
}
