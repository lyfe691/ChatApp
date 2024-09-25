package com.ybdd.ChatApp.controller;

import com.ybdd.ChatApp.model.Message;
import com.ybdd.ChatApp.model.User;
import com.ybdd.ChatApp.repository.MessageRepository;
import com.ybdd.ChatApp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Controller
public class ChatController {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final Set<String> chatRooms = new HashSet<>();

    public ChatController(UserRepository userRepository, MessageRepository messageRepository, SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/create-room")
    @ResponseBody
    public String createRoom(@RequestParam String roomName, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getCreatedRoom() != null) {
            return "You can only create one room.";
        }

        if (chatRooms.contains(roomName)) {
            return "Room exists. You are now joining it.";
        }

        chatRooms.add(roomName);
        user.setCreatedRoom(roomName);
        userRepository.save(user);

        return "Room created successfully!";
    }


    @GetMapping("/chat/history/{room}")
    @ResponseBody
    public List<Message> getChatHistory(@PathVariable String room) {
        return messageRepository.findByRoom(room);
    }

    @MessageMapping("/sendMessage")
    public void sendMessage(Message message, SimpMessageHeaderAccessor headerAccessor) {
        String chatRoom = (String) headerAccessor.getSessionAttributes().get("chatRoom");
        String username = headerAccessor.getUser().getName();

        message.setSender(username);
        message.setRoom(chatRoom);
        message = messageRepository.save(message);

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.getMessages().add(message);
            userRepository.save(user);
        }

        messagingTemplate.convertAndSend("/topic/" + chatRoom, message);
    }

    @MessageMapping("/joinRoom")
    public void joinRoom(String chatRoom, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("chatRoom", chatRoom);
        chatRooms.add(chatRoom);
        messagingTemplate.convertAndSend("/topic/rooms", chatRooms);
    }

    @GetMapping("/chat")
    public String showChatPage(Model model) {
        return "index";
    }

    @GetMapping("/rooms")
    @ResponseBody
    public Set<String> getRooms() {
        return chatRooms;
    }
    @PostMapping("/delete-room")
    @ResponseBody
    public ResponseEntity<String> deleteRoom(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String createdRoom = user.getCreatedRoom();
        if (createdRoom == null) {
            return ResponseEntity.badRequest().body("No room found to delete.");
        }


        chatRooms.remove(createdRoom);
        user.setCreatedRoom(null);
        userRepository.save(user);

        return ResponseEntity.ok("Room deleted successfully!");
    }


    @GetMapping("/user-room")
    @ResponseBody
    public ResponseEntity<String> getUserCreatedRoom(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                  .orElseThrow(() -> new RuntimeException("User not found"));

            String createdRoom = user.getCreatedRoom();

            if (createdRoom == null) {
                return ResponseEntity.badRequest().body("No room created.");
            }

            return ResponseEntity.ok(createdRoom);
        }


}
