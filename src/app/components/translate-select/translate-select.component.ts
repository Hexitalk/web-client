import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-translate-select',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './translate-select.component.html',
  styleUrl: './translate-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateSelectComponent implements OnInit {
  languages: MenuItem[] | undefined;
  selectedLanguage: string = 'en';

  constructor(private translocoService: TranslocoService) {}

  ngOnInit() {
    this.languages = [
      { name: 'François', code: 'fr' },
      { name: 'Español', code: 'es' },
      { name: 'English', code: 'en' },
    ];
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes['selectedLanguage']) {
      console.log(this.selectedLanguage);

      this.setLang(this.selectedLanguage);
    }
  }*/

  selectChange(event: DropdownChangeEvent) {
    console.log(event.value);
    this.setLang(event.value);
  }

  setLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
