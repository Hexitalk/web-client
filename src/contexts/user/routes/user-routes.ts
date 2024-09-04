import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    //component: AuthLayoutComponent, // layout
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import(
            '../presentation/pages/test-user-page/test-user-page.component'
          ).then((m) => m.TestUserPageComponent),
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
