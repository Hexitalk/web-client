import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChatLineModel } from '../../../../../domain/models/chat-line.model';

interface ChatLineItem extends ChatLineModel {
  isAuthUser: boolean;
  isLastGroupItem: boolean;
}

@Component({
  selector: 'app-chat-line',
  standalone: true,
  imports: [],
  templateUrl: './chat-line.component.html',
  styleUrl: './chat-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatLineComponent {
  chatLineItem = input.required<ChatLineItem>();
}
