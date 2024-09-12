import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelHubComponent } from '../../components/panel-hub/panel-hub.component';

@Component({
  selector: 'app-main-hub-page',
  standalone: true,
  imports: [PanelHubComponent],
  templateUrl: './main-hub-page.component.html',
  styleUrl: './main-hub-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHubPageComponent {}
