import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageSynchrone } from '../../models/messagesynchrone.interface';
import { ChatService } from '../../services/chat.service';

// ✅ Import des modules Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule, // ✅ Nécessaire pour les directives Angular (*ngFor, *ngIf)
    MatCardModule, // ✅ Permet d'utiliser <mat-card>
    MatButtonModule, // ✅ Active les boutons Material
    MatIconModule, // ✅ Active les icônes Material
    MatFormFieldModule, // ✅ Active le champ de formulaire Material
    MatInputModule // ✅ Active le champ d'entrée Material
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages$: Observable<MessageSynchrone[]> = new Observable();
  selectedUserId$: Observable<number> = new Observable(); // ✅ Initialisation correcte

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messages$ = this.chatService.messages$;
    this.selectedUserId$ = this.chatService.selectedUserId$;
  }

  sendMessage(content: string) {
    console.log('Sending message:', content); // ✅ Debugging
    this.chatService.sendMessage(content);
  }

  switchUser(userId: number) {
    console.log('Switching user to:', userId); // ✅ Debugging
    this.chatService.switchUser(userId);
  }
}
