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
      this.shouldScrollToBottom = true;
    }
    if (changes['isLoading']) {
      if (this.isLoading()) {
        this.shouldScrollToBottom = true;
      }
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messageContainer) {
        const element = this.messageContainer.nativeElement;
        
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      }
          } catch (error) {
        try {
          if (this.messageContainer) {
            const element = this.messageContainer.nativeElement;
            element.scrollTop = element.scrollHeight;
          }
        } catch (fallbackError) {
        }
      }
  }


}
