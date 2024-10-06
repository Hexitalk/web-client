import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { ListenChatLinesUseCase } from '../../../use-cases/listen-chat-lines.usecase';
import { ChatModel } from '../../../domain/models/chat.model';
import { GetChatUseCase } from '../../../use-cases/get-chat.usecase';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatBodyComponent } from './components/chat-body/chat-body.component';
import { ProfileModel } from '../../../../profile/domain/models/profile.model';
import { AuthDataModule } from '../../../../auth/data/auth-data.module';
import { GetAuthIdUseCase } from '../../../../auth/use-cases/get-auth-id.usecase';
import { ChatDataModule } from '../../../data/chat-data.module';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    AuthDataModule,
    ChatDataModule,
    ChatHeaderComponent,
    ChatBodyComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  targetProfileId = input.required<string>();

  authUserId: string = '';

  chat: WritableSignal<ChatModel | undefined> = signal<ChatModel | undefined>(
    undefined
  );

  targetProfile: WritableSignal<ProfileModel | undefined> = signal<
    ProfileModel | undefined
  >(undefined);

  constructor(
    private listenChatLinesUseCase: ListenChatLinesUseCase,
    private getChatUseCase: GetChatUseCase,
    private getAuthIdUseCase: GetAuthIdUseCase
  ) {
    this.authUserId = this.getAuthIdUseCase.execute();

    effect(() => {
      this.loadChat(this.targetProfileId());
    });

    effect(
      () => {
        if (this.chat()) {
          const targetProfileItem = this.chat()
            ?.chats_profiles.filter((cp) => cp.profile)
            .map((cp) => cp.profile)
            .find((p) => p?.user_id != this.authUserId);

          if (targetProfileItem) {
            this.setTargetProfile(targetProfileItem);
          }
        }
      },
      { allowSignalWrites: true }
    );

    this.listenChatLinesUseCase
      .execute()
      .pipe(
        // tap((res) => console.log(res.chat_id + ' == ' + this.chat()?.id)),
        filter((res) => res.chat_id == this.chat()?.id)
      )
      .subscribe((res) => {
        // console.log('si entra');

        if (this.chat()) {
          this.chat.update((prev) => {
            if (prev) {
              prev.chat_lines = [...prev.chat_lines, res];
              return { ...prev };
            }
            return prev;
          });
        }
      });
  }

  ngOnInit(): void {
    this.chat()?.chats_profiles;
  }

  private loadChat(targetProfileId: string) {
    this.getChatUseCase.execute(targetProfileId).subscribe((resChat) => {
      this.chat.set(resChat);
    });
  }

  private setTargetProfile(targetProfile: ProfileModel) {
    this.targetProfile.set(targetProfile);
  }
}
