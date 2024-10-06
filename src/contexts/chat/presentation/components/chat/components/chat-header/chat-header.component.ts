import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProfileModel } from '../../../../../../profile/domain/models/profile.model';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  profile = input.required<ProfileModel>();
}
