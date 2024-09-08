import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormAuthComponent } from '../../components/login-form-auth/login-form-auth.component';

@Component({
  selector: 'app-login-auth-page',
  standalone: true,
  imports: [LoginFormAuthComponent],
  templateUrl: './login-auth-page.component.html',
  styleUrl: './login-auth-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAuthPageComponent {}
