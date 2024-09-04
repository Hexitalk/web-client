import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test-friend-page',
  standalone: true,
  imports: [],
  templateUrl: './test-friend-page.component.html',
  styleUrl: './test-friend-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestFriendPageComponent {

}
