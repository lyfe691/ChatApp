package com.ybdd.ChatApp.controller;

import com.ybdd.ChatApp.model.Message;
import com.ybdd.ChatApp.model.User;
import com.ybdd.ChatApp.repository.MessageRepository;
import com.ybdd.ChatApp.repository.UserRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;

import java.util.HashSet;
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

    @MessageMapping("/sendMessage")
    public void sendMessage(Message message, SimpMessageHeaderAccessor headerAccessor) {
        String chatRoom = (String) headerAccessor.getSessionAttributes().get("chatRoom");
        String username = headerAccessor.getUser().getName();

        message.setSender(username);
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
}
