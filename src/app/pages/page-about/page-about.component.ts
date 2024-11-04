import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslateSelectComponent } from '../../components/translate-select/translate-select.component';
import { A11yModule } from '@angular/cdk/a11y';
import { Button } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-page-about',
  standalone: true,
  imports: [
    RouterModule,
    TranslocoModule,
    TranslateSelectComponent,
    A11yModule,
    Button,
    MenubarModule,
  ],
  templateUrl: './page-about.component.html',
  styleUrl: './page-about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageAboutComponent {}
