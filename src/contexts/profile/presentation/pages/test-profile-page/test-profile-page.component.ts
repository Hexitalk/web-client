import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './test-profile-page.component.html',
  styleUrl: './test-profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestProfilePageComponent {

}
