package com.ybdd.ChatApp.service;

import com.ybdd.ChatApp.model.User;
import com.ybdd.ChatApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    public User registerNewUser(String username, String email, String password) {
        if (userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Username or email already exists.");
        }
        User newUser = new User(username, email, passwordEncoder.encode(password));
        return userRepository.save(newUser);
    }

    @Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(input)
                .or(() -> userRepository.findByEmail(input))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}
