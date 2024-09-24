import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { ListenHubUpdateUseCase } from '../../../use-cases/listen-hub-update.usecase';
import { HubDataModule } from '../../../data/hub-data.module';
import { PanelHubItemComponent } from '../panel-hub-item/panel-hub-item.component';
import { HubModel } from '../../../domain/models/hub.model';

@Component({
  selector: 'app-panel-hub',
  standalone: true,
  imports: [HubDataModule, PanelHubItemComponent],
  templateUrl: './panel-hub.component.html',
  styleUrl: './panel-hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelHubComponent {
  hub: WritableSignal<HubModel | undefined> = signal<HubModel | undefined>(
    undefined
  );

  constructor(private listenHubUpdateUseCase: ListenHubUpdateUseCase) {
    this.listenHubUpdateUseCase.execute().subscribe((res) => {
      console.log('socket listen hub update a ', res);
      this.hub.set(res);
    });
  }
}
