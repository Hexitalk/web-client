import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateSelectComponent } from '../../components/translate-select/translate-select.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, TranslocoModule, TranslateSelectComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
