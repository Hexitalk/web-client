import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslateSelectComponent } from '../../components/translate-select/translate-select.component';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import { Button } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterModule,
    TranslocoModule,
    TranslateSelectComponent,
    A11yModule,
    Button,
    MenubarModule,
  ],
  providers: [LiveAnnouncer],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'main',
    'aria-label': 'Landing page',
  },
})
export class LandingPageComponent {
  constructor(private liveAnnouncer: LiveAnnouncer) {}

  announceMessage() {
    this.liveAnnouncer.announce('Contenido actualizado.');
  }
}
