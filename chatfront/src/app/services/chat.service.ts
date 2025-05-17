import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageSynchrone } from '../models/messagesynchrone.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class ChatService {
    
    private messagesSubject = new BehaviorSubject<MessageSynchrone[]>([]);
    messages$ = this.messagesSubject.asObservable();
    private selectedUserId = new BehaviorSubject<number>(1); // Par défaut, Client ID = 1
    selectedUserId$: Observable<number> = this.selectedUserId.asObservable();

    constructor(private http: HttpClient) {
        this.loadMessages(1); // Chargement des messages pour Discussion ID = 1
    }

    loadMessages(discussionId: number) {
        this.http.get<MessageSynchrone[]>(`http://localhost:8080/discussions/${discussionId}/messages`)
            .subscribe(messages => {
                this.messagesSubject.next(messages);
            });
    }

    sendMessage(content: string) {
        const userId = this.selectedUserId.value;
        const messagePayload = { utilisateur: { id: userId }, contenu: content };

    console.log('📢 Message envoyé:', JSON.stringify(messagePayload));
        this.http.post<MessageSynchrone>(`http://localhost:8080/discussions/1/messages`, { utilisateur: { id: userId }, contenu: content })
            .subscribe(newMessage => {
                const messages = this.messagesSubject.value;
                this.messagesSubject.next([...messages, newMessage]);
            });
    }

    switchUser(userId: number) {
        this.selectedUserId.next(userId);
    }
}
