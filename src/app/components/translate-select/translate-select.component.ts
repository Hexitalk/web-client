import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-translate-select',
  standalone: true,
  imports: [],
  templateUrl: './translate-select.component.html',
  styleUrl: './translate-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateSelectComponent {
  constructor(private translocoService: TranslocoService) {}

  setLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
