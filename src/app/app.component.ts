import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GetAuthTokenUseCase } from '../contexts/auth/use-cases/get-auth-token.usecase';
import { firstValueFrom } from 'rxjs';
import { AuthDataModule } from '../contexts/auth/data/auth-data.module';
import { TranslocoModule } from '@ngneat/transloco';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthDataModule, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private getAuthTokenUseCase: GetAuthTokenUseCase,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    // PrimeNG Config
    this.primengConfig.ripple = true;

    // EndPrimeNG Config
    this.redirectAuth();
  }

  async redirectAuth() {
    const token = await firstValueFrom(this.getAuthTokenUseCase.execute());

    if (token) {
      this.router.navigate(['/hub/main']);
    }
  }
}
