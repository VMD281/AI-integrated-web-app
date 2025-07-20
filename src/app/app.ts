import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { MessagePanel } from './message-panel/message-panel';
import { UserInput } from './user-input/user-input';
import { Message } from './utility/constants';
import { AiService } from './services/ai.service';
import { v4 as uuid } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MessagePanel, UserInput, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('AI chat app');
  data: Message[] = [];
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private aiService: AiService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('App component initialized');
  }

  getMessage($event: string) {
    console.log('Received message from user input:', $event);
    
    let messageObject: Message = {
      id: uuid(),
      sender: 'user',
      content: $event,
      dateTime: new Date(),
    };

    this.data.push(messageObject);
    console.log('Added user message to conversation. Total messages:', this.data.length);
    
    this.isLoading.set(true);
    this.cdr.detectChanges();
    
    this.aiService.sendMessage($event, this.data).subscribe({
      next: (response) => {
        console.log('AI response received:', response);
        
        const aiMessage: Message = {
          id: uuid(),
          sender: 'ai',
          content: response,
          dateTime: new Date(),
        };
        
        this.data.push(aiMessage);
        console.log('Added AI message to conversation. Total messages:', this.data.length);
        
        this.isLoading.set(false);
        this.error.set(null);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error getting AI response:', error);
        
        const errorMessage: Message = {
          id: uuid(),
          sender: 'ai',
          content: 'Sorry, I encountered an error. Please try again.',
          dateTime: new Date(),
        };
        
        this.data.push(errorMessage);
        
        this.isLoading.set(false);
        this.error.set(error.message);
        this.cdr.detectChanges();
      }
    });
  }
}
