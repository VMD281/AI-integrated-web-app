import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistoryService, ChatSession } from '../services/chat-history.service';
import { Message } from '../utility/constants';

@Component({
  selector: 'app-chat-history',
  imports: [CommonModule],
  templateUrl: './chat-history.html',
  styleUrl: './chat-history.scss',
})
export class ChatHistory {
  @Input() currentSessionId: string = '';
  @Output() sessionSelected = new EventEmitter<ChatSession>();
  @Output() newChat = new EventEmitter<void>();
  @Output() clearHistory = new EventEmitter<void>();
  @Output() sidebarStateChanged = new EventEmitter<boolean>();

  sessions: ChatSession[] = [];
  isOpen = false;

  constructor(private chatHistoryService: ChatHistoryService) {}

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.sessions = this.chatHistoryService.getAllSessions();
  }

  selectSession(session: ChatSession) {
    this.sessionSelected.emit(session);
    this.currentSessionId = session.id;
  }

  startNewChat() {
    this.newChat.emit();
  }

  deleteSession(event: Event, sessionId: string) {
    event.stopPropagation();
    this.chatHistoryService.deleteSession(sessionId);
    this.loadSessions();
  }

  clearAllHistory() {
    if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      this.chatHistoryService.clearAllSessions();
      this.loadSessions();
      this.clearHistory.emit();
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarStateChanged.emit(this.isOpen);
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
} 