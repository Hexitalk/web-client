import { Routes } from '@angular/router';
import { HubDefaultLayoutComponent } from '../presentation/layout/hub-default-layout/hub-default-layout.component';

export const HUB_ROUTES: Routes = [
  {
    path: '',
    //component: AuthLayoutComponent, // layout
    children: [
      {
        path: '',
        component: HubDefaultLayoutComponent, // layout 2
        children: [
          {
            path: 'main',
            loadComponent: () =>
              import(
                '../presentation/pages/main-hub-page/main-hub-page.component'
              ).then((m) => m.MainHubPageComponent),
          },
        ],
      },
    ],
  },
];
