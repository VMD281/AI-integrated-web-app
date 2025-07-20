import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked, Signal } from '@angular/core';
import { Message } from '../utility/constants';

@Component({
  selector: 'app-message-panel',
  imports: [],
  templateUrl: './message-panel.html',
  styleUrl: './message-panel.scss',
})
export class MessagePanel implements OnChanges, AfterViewChecked {
  @Input() messages: Message[] = [];
  @Input() isLoading!: Signal<boolean>;
  @ViewChild('messageContainer', { static: false }) messageContainer!: ElementRef;

  private shouldScrollToBottom = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      console.log('MessagePanel: messages changed');
      console.log('Messages array length:', this.messages.length);
      console.log('Messages content:', JSON.stringify(this.messages, null, 2));
      
      // Set flag to scroll to bottom when new messages are added
      this.shouldScrollToBottom = true;
    }
    if (changes['isLoading']) {
      console.log('MessagePanel: loading state changed to:', this.isLoading());
      
      // Also scroll when loading state changes (for typing indicator)
      if (this.isLoading()) {
        this.shouldScrollToBottom = true;
      }
    }
  }

  ngAfterViewChecked() {
    // Scroll to bottom after view is checked and DOM is updated
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messageContainer) {
        const element = this.messageContainer.nativeElement;
        
        // Use smooth scrolling for better UX
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
        
        console.log('Scrolled to bottom, scrollHeight:', element.scrollHeight);
      }
    } catch (error) {
      console.error('Error scrolling to bottom:', error);
      
      // Fallback to direct scroll if smooth scroll fails
      try {
        if (this.messageContainer) {
          const element = this.messageContainer.nativeElement;
          element.scrollTop = element.scrollHeight;
        }
      } catch (fallbackError) {
        console.error('Fallback scroll also failed:', fallbackError);
      }
    }
  }
}
