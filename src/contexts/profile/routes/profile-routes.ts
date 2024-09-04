import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    //component: AuthLayoutComponent, // layout
    children: [
      {
        path: 'test',
        loadChildren: () =>
          import(
            '../presentation/pages/test-profile-page/test-profile-page.component'
          ).then((m) => m.TestProfilePageComponent),
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
