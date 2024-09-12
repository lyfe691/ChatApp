package com.ybdd.ChatApp.repository;

import com.ybdd.ChatApp.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByRoom(String room);
}
