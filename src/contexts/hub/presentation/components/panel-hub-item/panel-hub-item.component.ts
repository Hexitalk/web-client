import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { HubChatModel } from '../../../domain/models/hub-chat.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HubDataModule } from '../../../data/hub-data.module';
import { SetHubChatStateUseCase } from '../../../use-cases/set-hub-chat-state.usecase';
import { HubChatStateEnum } from '../../../domain/enums';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'app-panel-hub-item',
  standalone: true,
  imports: [
    HubDataModule,
    CommonModule,
    ButtonGroupModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './panel-hub-item.component.html',
  styleUrl: './panel-hub-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelHubItemComponent implements OnInit {
  @Input('hub-chat') hubChat?: HubChatModel;

  @HostBinding('class') get hostClass(): string {
    return this.hubChat ? `slot-${this.hubChat.slot}` : '';
  }

  StateEnum = HubChatStateEnum;

  constructor(private setHubChatStateUseCase: SetHubChatStateUseCase) {}

  ngOnInit(): void {
    console.log(this.hubChat);
  }

  startHubChatSearch() {
    if (this.hubChat) {
      const { slot } = this.hubChat;
      this.setHubChatStateUseCase
        .execute({ slot, state: HubChatStateEnum.OPEN })
        .subscribe((res) => {
          console.log('SetHubChatStateUseCase -> ', res);
        });
    }
  }

  stopHubChatSearch() {
    if (this.hubChat) {
      const { slot } = this.hubChat;
      this.setHubChatStateUseCase
        .execute({ slot, state: HubChatStateEnum.CLOSE })
        .subscribe((res) => {
          console.log('SetHubChatStateUseCase -> ', res);
        });
    }
  }

  accetpHubChatRequest() {
    if (this.hubChat) {
      const { slot } = this.hubChat;
      this.setHubChatStateUseCase
        .execute({ slot, state: HubChatStateEnum.ACCEPTED })
        .subscribe((res) => {
          console.log('SetHubChatStateUseCase ACCEPTED -> ', res);
        });
    }
  }

  initChat() {}
}
