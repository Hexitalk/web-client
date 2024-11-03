import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthLoginUseCase } from '../../../use-cases/auth-login.usecase';
import { AuthDataModule } from '../../../data/auth-data.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { AuthSocketLoginUseCase } from '../../../use-cases/auth-socket-login.usecase';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-login-form-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthDataModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RouterModule,
    TranslocoModule,
  ],
  templateUrl: './login-form-auth.component.html',
  styleUrl: './login-form-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormAuthComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authLoginUseCase: AuthLoginUseCase,
    private authSocketLoginUseCase: AuthSocketLoginUseCase,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['yolo@yolo.com', [Validators.required, Validators.email]],
      password: [
        'Con1234',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authLoginUseCase.execute(this.loginForm.value).subscribe({
        next: (res) => {
          this.authSocketLoginUseCase.execute();
          this.router.navigate(['/hub/main']);
        },
        error: (err) => {
          console.log('Login error', err);
        },
      });
    }
  }
}
