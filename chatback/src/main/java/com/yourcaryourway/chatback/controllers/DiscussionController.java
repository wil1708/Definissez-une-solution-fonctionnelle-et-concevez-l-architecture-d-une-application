package com.yourcaryourway.chatback.controllers;

import com.yourcaryourway.chatback.entities.Discussion;
import com.yourcaryourway.chatback.entities.MessageSynchrone;
import com.yourcaryourway.chatback.repositories.DiscussionRepository;
import com.yourcaryourway.chatback.repositories.MessageSynchroneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/discussions")
public class DiscussionController {
    @Autowired
    private MessageSynchroneRepository messageSynchroneRepository;
    @Autowired
    private DiscussionRepository discussionRepository;

    @GetMapping("/{discussionId}/messages")
    public List<MessageSynchrone> getMessages(@PathVariable Long discussionId) {
        return messageSynchroneRepository.findByDiscussionIdOrderByDateCreationAsc(discussionId);
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

