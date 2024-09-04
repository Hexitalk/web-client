import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthLoginUseCase } from '../../../use-cases/auth-login.usecase';

@Component({
  selector: 'app-login-form-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form-auth.component.html',
  styleUrl: './login-form-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormAuthComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authLoginUseCase: AuthLoginUseCase
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
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
      console.log('1- Formulario válido', this.loginForm.value);

      this.authLoginUseCase.execute(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('response:', res);
        },
        error: (err) => {
          console.log('error from server AA_ ', err);
        },
      });
    }
  }
}
