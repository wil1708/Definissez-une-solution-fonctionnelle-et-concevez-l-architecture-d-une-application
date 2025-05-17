package com.yourcaryourway.chatback.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class MessageSynchrone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Discussion discussion;
    @Getter
    @ManyToOne
    private Utilisateur utilisateur;
    private String contenu;
    private LocalDateTime dateCreation;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
    }
    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
    public void setDiscussion(Discussion discussion) {
        this.discussion = discussion;
    }
    public Utilisateur getUtilisateur() {
        return utilisateur;
    }
    public String getContenu() {
        return contenu;
    }



}
