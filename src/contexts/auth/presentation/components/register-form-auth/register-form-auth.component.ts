import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthRegisterUseCase } from '../../../use-cases/auth-register.usecase';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthDataModule } from '../../../data/auth-data.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-register-form-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthDataModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    RouterModule,
  ],
  templateUrl: './register-form-auth.component.html',
  styleUrl: './register-form-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormAuthComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authRegisterUseCase: AuthRegisterUseCase,
    private socket: Socket
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
        ],
      ],
      nick: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      date_birth: ['', Validators.required],
      gender: ['', Validators.required],
      province_id: ['', Validators.required],
      country_id: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('1- Formulario válido', this.registerForm.value);

      this.authRegisterUseCase.execute(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('response:', res);
          this.socket.emit('auth.login-socket', {
            token: res.token,
            lang: 'en',
          });
        },
        error: (err) => {
          console.log('error from server AA_ ', err);
        },
      });
    }
  }
}

/*

email: string;
  password: string;
  nick: string;
  image?: string;
  date_birth: Date;+
  gender: string;
  province_id: string;
  country_id: string;
*/
