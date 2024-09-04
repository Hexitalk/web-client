import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormAuthComponent } from '../../components/register-form-auth/register-form-auth.component';

@Component({
  selector: 'app-register-auth-page',
  standalone: true,
  imports: [RegisterFormAuthComponent],
  templateUrl: './register-auth-page.component.html',
  styleUrl: './register-auth-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterAuthPageComponent {}
