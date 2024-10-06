import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatConversationComponent } from '../chat-conversation/chat-conversation.component';
import { ChatModel } from '../../../../../domain/models/chat.model';

@Component({
  selector: 'app-chat-body',
  standalone: true,
  imports: [ChatInputComponent, ChatConversationComponent],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBodyComponent {
  chat = input.required<ChatModel>();
}
