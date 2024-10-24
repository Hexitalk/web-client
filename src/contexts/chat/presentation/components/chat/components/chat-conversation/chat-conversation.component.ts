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
import { ChatModel } from '../../../../../domain/models/chat.model';

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
  chat = input.required<ChatModel>();

  authUserId: string = '';

  listChatLines: WritableSignal<ChatLineItem[]> = signal<ChatLineItem[]>([]);

  @ViewChild('scrollPanel') scrollPanel?: ScrollPanel;

  constructor(private getAuthIdUseCase: GetAuthIdUseCase) {
    effect(
      () => {
        this.authUserId = this.getAuthIdUseCase.execute();
        this.clearList();
        this.addChatLines(this.chat().chat_lines);
      },
      { allowSignalWrites: true }
    );
  }

  private clearList() {
    this.listChatLines.set([]);
  }

  private addChatLines(chatLines: ChatLineModel[]) {
    const newListItems: ChatLineItem[] = chatLines.map((cl, index, arr) => {
      cl.profile = this.chat()
        .chats_profiles.map((cp) => cp.profile)
        .find((p) => p && p.id == cl.profile_id);
      return {
        ...cl,
        isAuthUser:
          (cl.profile && cl.profile.user_id == this.authUserId) || false,
        isLastGroupItem:
          !arr[index + 1] || arr[index + 1].profile_id != cl.profile_id,
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
      scrollableContent.scrollTo({
        top: scrollableContent.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
}
