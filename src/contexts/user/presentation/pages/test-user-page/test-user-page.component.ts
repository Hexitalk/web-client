import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test-user-page',
  standalone: true,
  imports: [],
  templateUrl: './test-user-page.component.html',
  styleUrl: './test-user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestUserPageComponent {

}
