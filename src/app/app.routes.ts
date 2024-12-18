import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { authLazyGuard } from '../contexts/shared/guards/auth-lazy.guard';
import { PageAboutComponent } from './pages/page-about/page-about.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'about',
    component: PageAboutComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../contexts/auth/routes/auth-routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'user',
    canMatch: [authLazyGuard],
    loadChildren: () =>
      import('../contexts/user/routes/user-routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'friend',
    canMatch: [authLazyGuard],
    loadChildren: () =>
      import('../contexts/friend/routes/friend-routes').then(
        (m) => m.FRIEND_ROUTES
      ),
  },
  {
    path: 'profile',
    canMatch: [authLazyGuard],
    loadChildren: () =>
      import('../contexts/profile/routes/profile-routes').then(
        (m) => m.PROFILE_ROUTES
      ),
  },
  {
    path: 'hub',
    canMatch: [authLazyGuard],
    loadChildren: () =>
      import('../contexts/hub/routes/hub-routes').then((m) => m.HUB_ROUTES),
  },
  { path: '**', component: PageNotFoundComponent },

  //   {
  //   path: 'compose',
  //   component: ComposeMessageComponent,
  //   outlet: 'popup'
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  //   canMatch: [authGuard]
  // },
  // {
  //   path: 'crisis-center',
  //   loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
  //   data: { preload: true }
  // },
  // { path: '',   redirectTo: '/superheroes', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];
