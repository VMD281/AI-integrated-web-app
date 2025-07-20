import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.scss',
})
export class UserInput implements AfterViewInit {
  @Output() sendMessageEmitter = new EventEmitter();
  @ViewChild('messageInput', { static: false }) messageInput!: ElementRef<HTMLTextAreaElement>;
  message: string = '';

  ngAfterViewInit() {
    this.adjustTextareaHeight();
  }

  sendMessage() {
    if (this.message.trim()) {
      this.sendMessageEmitter.emit(this.message);
      this.message = '';
      this.adjustTextareaHeight();
    }
  }

  onKeyUp($event: any) {
    if ($event.key === 'Enter' && !$event.shiftKey) {
      this.sendMessage();
    } else {
      this.adjustTextareaHeight();
    }
  }

  private adjustTextareaHeight() {
    if (this.messageInput) {
      const textarea = this.messageInput.nativeElement;
      const minHeight = 50;
      const maxHeight = 150;
      
      textarea.style.height = 'auto';
      
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
      
      textarea.style.height = newHeight + 'px';
      
      if (scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  }
}
