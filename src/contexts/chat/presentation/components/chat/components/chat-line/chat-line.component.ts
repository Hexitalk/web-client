import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  input,
} from '@angular/core';
import { ChatLineModel } from '../../../../../domain/models/chat-line.model';
import { CommonModule } from '@angular/common';

interface ChatLineItem extends ChatLineModel {
  isAuthUser: boolean;
  isLastGroupItem: boolean;
}

@Component({
  selector: 'app-chat-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-line.component.html',
  styleUrl: './chat-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatLineComponent {
  chatLineItem = input.required<ChatLineItem>();
  @HostBinding('class.is-auth') get isAuth() {
    return this.chatLineItem().isAuthUser;
  }
  @HostBinding('class.is-last') get isLast() {
    return this.chatLineItem().isLastGroupItem;
  }

  constructor() {
    effect(() => {
      console.log(this.chatLineItem());
    });
  }
}
