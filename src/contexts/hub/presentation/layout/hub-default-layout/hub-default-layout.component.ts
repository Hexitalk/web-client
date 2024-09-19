import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthLogoutUseCase } from '../../../../auth/use-cases/auth-logout.usecase';
import { AuthSocketLogoutUseCase } from '../../../../auth/use-cases/auth-socket-logout.usecase';

@Component({
  selector: 'app-hub-default-layout',
  standalone: true,
  imports: [
    RouterModule,
    MenubarModule,
    AvatarModule,
    DropdownModule,
    OverlayPanelModule,
    MenuModule,
  ],
  templateUrl: './hub-default-layout.component.html',
  styleUrl: './hub-default-layout.component.scss',
})
export class HubDefaultLayoutComponent implements OnInit {
  menuItems: any[] = [];
  avatarMenuItems: any[] = [];

  constructor(
    private router: Router,
    private authLogoutUseCase: AuthLogoutUseCase,
    private authSocketLogoutUseCase: AuthSocketLogoutUseCase
  ) {}

  ngOnInit() {
    // Menú principal a la izquierda
    this.menuItems = [
      { label: 'Hub', icon: 'pi pi-fw pi-circle', routerLink: ['/hub/main'] },
      {
        label: 'Friends',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/friends'],
      },
    ];

    // Menú del avatar a la derecha
    this.avatarMenuItems = [
      {
        label: 'Editar perfil',
        icon: 'pi pi-fw pi-user-edit',
        command: () => this.editProfile(),
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  editProfile() {
    // Acción para editar el perfil
    console.log('Edit Profile');
  }

  logout() {
    this.authLogoutUseCase.execute();
    this.authSocketLogoutUseCase.execute();
    this.router.navigate(['/auth/login']);
  }
}
