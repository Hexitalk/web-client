import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SendChatLineUseCase } from '../../../../../use-cases/send-chat-line.usecase';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  chatId = input.required<string>();

  inputText: string = '';

  constructor(private sendChatLineUseCase: SendChatLineUseCase) {}

  sendInputText() {
    console.log(this.inputText);
    this.sendChatLineUseCase
      .execute({
        chatId: this.chatId(),
        message: this.inputText,
      })
      .subscribe((res) => console.log);
    this.inputText = '';
  }
}
