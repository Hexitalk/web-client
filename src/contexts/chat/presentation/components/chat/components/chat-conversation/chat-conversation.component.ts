import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ScrollPanel, ScrollPanelModule } from 'primeng/scrollpanel';
import { ChatLineModel } from '../../../../../domain/models/chat-line.model';
import { AuthDataModule } from '../../../../../../auth/data/auth-data.module';
import { GetAuthIdUseCase } from '../../../../../../auth/use-cases/get-auth-id.usecase';
import { ChatLineComponent } from '../chat-line/chat-line.component';

interface ChatLineItem extends ChatLineModel {
  isAuthUser: boolean;
  isLastGroupItem: boolean;
}

@Component({
  selector: 'app-chat-conversation',
  standalone: true,
  imports: [AuthDataModule, ScrollPanelModule, ChatLineComponent],
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationComponent {
  chatLines = input.required<ChatLineModel[]>();

  authUserId: string = '';

  listChatLines: WritableSignal<ChatLineItem[]> = signal<ChatLineItem[]>([]);

  @ViewChild('scrollPanel') scrollPanel?: ScrollPanel;

  constructor(private getAuthIdUseCase: GetAuthIdUseCase) {
    effect(
      () => {
        this.authUserId = this.getAuthIdUseCase.execute();
        this.clearList();
        this.addChatLines(this.chatLines());
      },
      { allowSignalWrites: true }
    );
  }

  private clearList() {
    this.listChatLines.set([]);
  }

  private addChatLines(chatLines: ChatLineModel[]) {
    const newListItems: ChatLineItem[] = chatLines.map((cl) => {
      return {
        ...cl,
        isAuthUser:
          (cl.profile && cl.profile.user_id == this.authUserId) || false,
        isLastGroupItem: false, // TODO: make the logic
      };
    });

    this.listChatLines.update((prev) => {
      return [...prev, ...newListItems];
    });

    setTimeout(() => {
      this.scrollToBottom();
    }, 200);
  }

  scrollToBottom() {
    if (this.scrollPanel && this.scrollPanel.contentViewChild) {
      const scrollableContent = this.scrollPanel.contentViewChild.nativeElement;
      scrollableContent.scrollTop = scrollableContent.scrollHeight;
    }
  }
}
