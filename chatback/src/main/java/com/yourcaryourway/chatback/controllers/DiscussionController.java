package com.yourcaryourway.chatback.controllers;

import com.yourcaryourway.chatback.entities.Discussion;
import com.yourcaryourway.chatback.entities.MessageSynchrone;
import com.yourcaryourway.chatback.repositories.DiscussionRepository;
import com.yourcaryourway.chatback.repositories.MessageSynchroneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/discussions")
public class DiscussionController {
    @Autowired
    private MessageSynchroneRepository messageSynchroneRepository;
    @Autowired
    private DiscussionRepository discussionRepository;

    @GetMapping("/{discussionId}/messages")
    public List<Map<String, Object>> getMessages(@PathVariable Long discussionId) {
        List<MessageSynchrone> messages = messageSynchroneRepository.findByDiscussionIdOrderByDateCreationAsc(discussionId);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        return messages.stream().map(msg -> Map.of(
                "id", msg.getId(),
                "utilisateur", Map.of("id", msg.getUtilisateur().getId()),
                "contenu", msg.getContenu(),
                "dateCreation", msg.getDateCreation().format(formatter)
        )).toList();
    }

    @PostMapping("/{discussionId}/messages")
    public MessageSynchrone sendMessage(@PathVariable Long discussionId, @RequestBody MessageSynchrone message) {
        message.setDateCreation(LocalDateTime.now());

        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new RuntimeException("Discussion non trouvée !"));
        message.setDiscussion(discussion);

        return messageSynchroneRepository.save(message);
    }


}

