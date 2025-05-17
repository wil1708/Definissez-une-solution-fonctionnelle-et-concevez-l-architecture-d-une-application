package com.yourcaryourway.chatback.repositories;

import com.yourcaryourway.chatback.entities.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
}
