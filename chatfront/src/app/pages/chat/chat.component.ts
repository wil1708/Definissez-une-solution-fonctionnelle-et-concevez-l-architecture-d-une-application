import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageSynchrone } from '../../models/messagesynchrone.interface';
import { ChatService } from '../../services/chat.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule 
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  @ViewChild('chatBox') chatBox!: ElementRef;

  messages$: Observable<MessageSynchrone[]> = new Observable();
  selectedUserId$: Observable<number> = new Observable(); 

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messages$ = this.chatService.messages$;
    this.selectedUserId$ = this.chatService.selectedUserId$;
  }

  sendMessage(content: string) {
    this.chatService.sendMessage(content);
    setTimeout(() => this.scrollToBottom(), 100);
  }

  switchUser(userId: number) {
    this.chatService.switchUser(userId);
  }

  scrollToBottom() {
    if (this.chatBox) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }
  }
}
