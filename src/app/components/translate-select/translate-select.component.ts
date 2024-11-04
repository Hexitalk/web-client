import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-translate-select',
  standalone: true,
  imports: [DropdownModule, FormsModule, TranslocoModule],
  templateUrl: './translate-select.component.html',
  styleUrl: './translate-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateSelectComponent implements OnInit {
  languages: MenuItem[] | undefined;
  selectedLanguage: string = 'en';

  constructor(private translocoService: TranslocoService) {
    this.languages = [
      { name: 'Español', code: 'es' },
      { name: 'François', code: 'fr' },
      { name: 'English', code: 'en' },
    ];
  }

  ngOnInit() {
    const langCurrent = this.translocoService.getActiveLang();
    if (langCurrent) {
      this.selectedLanguage = langCurrent;
    }

    //this.translocoService.setActiveLang(this.selectedLanguage);
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes['selectedLanguage']) {
      console.log(this.selectedLanguage);

      this.setLang(this.selectedLanguage);
    }
  }*/

  selectChange(event: DropdownChangeEvent) {
    this.setLang(event.value);
  }

  setLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
