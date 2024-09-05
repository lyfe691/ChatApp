package com.ybdd.ChatApp.repository;

import com.ybdd.ChatApp.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
