import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GetAuthTokenUseCase } from '../contexts/auth/use-cases/get-auth-token.usecase';
import { firstValueFrom } from 'rxjs';
import { AuthDataModule } from '../contexts/auth/data/auth-data.module';
import { TranslocoModule } from '@ngneat/transloco';
import { PrimeNGConfig } from 'primeng/api';
import { Socket } from 'ngx-socket-io';

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
    private primengConfig: PrimeNGConfig,
    private socket: Socket
  ) {}

  ngOnInit() {
    //

    //this.socket.connect();
    console.log('APP INIT 2');

    // Escuchar cuando el cliente se conecte
    this.socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    // Escuchar cuando el cliente se desconecte
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
    });

    setTimeout(() => {
      this.socket.emit('test', { msg: 'is test' });
    }, 5000);

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
