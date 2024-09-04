import { Routes } from '@angular/router';

export const FRIEND_ROUTES: Routes = [
  {
    path: '',
    //component: AuthLayoutComponent, // layout
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import(
            '../presentation/pages/test-friend-page/test-friend-page.component'
          ).then((m) => m.TestFriendPageComponent),
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
