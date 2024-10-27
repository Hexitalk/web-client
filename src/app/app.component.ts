import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GetAuthTokenUseCase } from '../contexts/auth/use-cases/get-auth-token.usecase';
import { merge, Subject, takeUntil } from 'rxjs';
import { AuthDataModule } from '../contexts/auth/data/auth-data.module';
import { TranslocoModule } from '@ngneat/transloco';
import { PrimeNGConfig } from 'primeng/api';
import { SocketDataModule } from '../contexts/socket/data/socket-data.module';
import { ListenReconnectSocketUseCase } from '../contexts/socket/use-cases/listen-reconnect-socket.usecase';
import { ListenConnectSocketUseCase } from '../contexts/socket/use-cases/listen-connect-socket.usecase';
import { AuthSocketLoginUseCase } from '../contexts/auth/use-cases/auth-socket-login.usecase';
import { ListenDisconnectSocketUseCase } from '../contexts/socket/use-cases/listen-disconnect-socket.usecase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthDataModule, TranslocoModule, SocketDataModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private getAuthTokenUseCase: GetAuthTokenUseCase,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private listenReconnectSocketUseCase: ListenReconnectSocketUseCase,
    private listenConnectSocketUseCase: ListenConnectSocketUseCase,
    private listenDisconnectSocketUseCase: ListenDisconnectSocketUseCase,
    private authSocketLoginUseCase: AuthSocketLoginUseCase
  ) {}

  ngOnInit() {
    // Socket

    const connectionEvents$ = merge(
      this.listenConnectSocketUseCase.execute(),
      this.listenReconnectSocketUseCase.execute()
    );

    connectionEvents$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.authSocketLoginUseCase.execute();
      },
    });

    this.listenDisconnectSocketUseCase
      .execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('socket: user disconnected');
      });

    // PrimeNG Config
    this.primengConfig.ripple = true;

    // EndPrimeNG Config
    this.redirectAuth();
  }

  async redirectAuth() {
    const token = this.getAuthTokenUseCase.execute();

    if (token) {
      this.router.navigate(['/hub/main']);
    }
  }

  ngOnDestroy() {
    // Completa el Subject para cancelar todas las suscripciones
    this.destroy$.next();
    this.destroy$.complete();
  }
}
