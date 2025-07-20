import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { MessagePanel } from './message-panel/message-panel';
import { UserInput } from './user-input/user-input';
import { ChatHistory } from './chat-history/chat-history';
import { Message } from './utility/constants';
import { AiService } from './services/ai.service';
import { ChatHistoryService, ChatSession } from './services/chat-history.service';
import { v4 as uuid } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MessagePanel, UserInput, ChatHistory, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('AI chat app');
  data: Message[] = [];
  isLoading = signal(false);
  error = signal<string | null>(null);
  currentSessionId: string = '';
  isSidebarOpen = signal(false);

  constructor(
    private aiService: AiService,
    private chatHistoryService: ChatHistoryService,
    private cdr: ChangeDetectorRef
  ) {
    this.startNewChat();
  }

  startNewChat() {
    this.currentSessionId = uuid();
    this.data = [];
    this.error.set(null);
    this.isLoading.set(false);
  }

  loadSession(session: ChatSession) {
    this.currentSessionId = session.id;
    this.data = [...session.messages];
    this.error.set(null);
    this.isLoading.set(false);
  }

  saveCurrentSession() {
    if (this.data.length > 0) {
      const session: ChatSession = {
        id: this.currentSessionId,
        title: this.chatHistoryService.generateSessionTitle(this.data[0].content),
        messages: [...this.data],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.chatHistoryService.saveSession(session);
    }
  }

  getMessage($event: string) {
    let messageObject: Message = {
      id: uuid(),
      sender: 'user',
      content: $event,
      dateTime: new Date(),
    };

    this.data.push(messageObject);
    
    this.saveCurrentSession();
    
    this.isLoading.set(true);
    this.cdr.detectChanges();
    
    this.aiService.sendMessage($event, this.data).subscribe({
      next: (response) => {
        const aiMessage: Message = {
          id: uuid(),
          sender: 'ai',
          content: response,
          dateTime: new Date(),
        };
        
        this.data.push(aiMessage);
        
        this.saveCurrentSession();
        
        this.isLoading.set(false);
        this.error.set(null);
        this.cdr.detectChanges();
      },
      error: (error) => {
        
        const errorMessage: Message = {
          id: uuid(),
          sender: 'ai',
          content: 'Sorry, I encountered an error. Please try again.',
          dateTime: new Date(),
        };
        
        this.data.push(errorMessage);
        
        this.saveCurrentSession();
        
        this.isLoading.set(false);
        this.error.set(error.message);
        this.cdr.detectChanges();
      }
    });
  }

  onSessionSelected(session: ChatSession) {
    this.loadSession(session);
  }

  onNewChat() {
    this.startNewChat();
  }

  onClearHistory() {
    this.startNewChat();
  }

  onSidebarStateChanged(isOpen: boolean) {
    this.isSidebarOpen.set(isOpen);
  }
}
