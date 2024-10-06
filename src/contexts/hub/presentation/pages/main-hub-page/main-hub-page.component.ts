import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PanelHubComponent } from '../../components/panel-hub/panel-hub.component';
import { ChatComponent } from '../../../../chat/presentation/components/chat/chat.component';
import { ChatDataModule } from '../../../../chat/data/chat-data.module';

@Component({
  selector: 'app-main-hub-page',
  standalone: true,
  imports: [PanelHubComponent, ChatDataModule, ChatComponent],
  templateUrl: './main-hub-page.component.html',
  styleUrl: './main-hub-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHubPageComponent {
  targetProfileId = signal<string | undefined>(undefined);

  setChatTargetProfileId(targetProfileId: any) {
    console.log('event', targetProfileId);

    this.targetProfileId.set(targetProfileId);
  }

  closeChat() {
    this.targetProfileId.set(undefined);
  }
}
