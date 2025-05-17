package com.yourcaryourway.chatback.repositories;

import com.yourcaryourway.chatback.entities.MessageSynchrone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageSynchroneRepository extends JpaRepository<MessageSynchrone, Long> {
    List<MessageSynchrone> findByDiscussionIdOrderByDateCreationAsc(Long discussionId);
}

