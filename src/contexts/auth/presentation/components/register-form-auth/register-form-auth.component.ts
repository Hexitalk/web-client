import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AuthSocketLoginUseCase } from '../../../use-cases/auth-socket-login.usecase';
import { Subscription } from 'rxjs';

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
export class RegisterFormAuthComponent implements OnDestroy {
  registerForm: FormGroup;

  private subscriptionAuthRegister?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authRegisterUseCase: AuthRegisterUseCase,
    private authSocketLoginUseCase: AuthSocketLoginUseCase
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
      this.subscriptionAuthRegister = this.authRegisterUseCase
        .execute(this.registerForm.value)
        .subscribe({
          next: (res) => {
            this.authSocketLoginUseCase.execute();
            this.router.navigate(['/hub/main']);
          },
          error: (err) => {
            console.log('Register error', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionAuthRegister) {
      this.subscriptionAuthRegister.unsubscribe();
    }
  }
}
