import { Routes } from '@angular/router';
import { AuthDefaultLayoutComponent } from '../presentation/layouts/auth-default-layout/auth-default-layout.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    //component: AuthLayoutComponent, // layout
    children: [
      {
        path: '',
        component: AuthDefaultLayoutComponent, // layout 2
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import(
                '../presentation/pages/login-auth-page/login-auth-page.component'
              ).then((m) => m.LoginAuthPageComponent),
          },
        ],
      },
      {
        path: '',
        component: AuthDefaultLayoutComponent, // layout 2
        children: [
          {
            path: 'sign-up',
            loadComponent: () =>
              import(
                '../presentation/pages/register-auth-page/register-auth-page.component'
              ).then((m) => m.RegisterAuthPageComponent),
          },
        ],
      },
    ],
  },
  /*{
    path: '',
    component: AuthRegisterLayoutComponent, // layout 2
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import(
            '../presentation/pages/login-auth-page/login-auth-page.component'
          ).then((m) => m.LoginAuthPageComponent),
      },
    ],
  },*/
];
