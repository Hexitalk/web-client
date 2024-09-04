import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    //component: AuthLayoutComponent, // layout
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import(
            '../presentation/pages/login-auth-page/login-auth-page.component'
          ).then((m) => m.LoginAuthPageComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import(
            '../presentation/pages/register-auth-page/register-auth-page.component'
          ).then((m) => m.RegisterAuthPageComponent),
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
