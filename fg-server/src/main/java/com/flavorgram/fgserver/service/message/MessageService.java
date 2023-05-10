package com.flavorgram.fgserver.service.message;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.model.message.Message;

@Service
public interface MessageService {
    Message createMessage(Message message);

    Message updateMessage(Message message);

    List<Message> getAllMessage();

    Message getMessageById(String messageId);

    void deleteMessage(String messageId);

}
