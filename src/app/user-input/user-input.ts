import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ENTER_KEY_ASCII = 13;
@Component({
  selector: 'app-user-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.scss',
})
export class UserInput {
  @Output() sendMessageEmitter = new EventEmitter();
  message: string = '';

  sendMessage() {
    this.sendMessageEmitter.emit(this.message);
  }

  onKeyUp($event: any) {
    if ($event.which === ENTER_KEY_ASCII) {
      this.sendMessage();
      this.message = '';
    }
  }
}
