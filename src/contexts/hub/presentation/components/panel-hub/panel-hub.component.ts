import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-panel-hub',
  standalone: true,
  imports: [],
  templateUrl: './panel-hub.component.html',
  styleUrl: './panel-hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelHubComponent {}
