import { Routes, RouterModule } from '@angular/router';
import { DASHBOARD_PAGE_ROUTES, SANDBOX_PAGE_ROUTES } from '@pwm/pages';
import { environment } from '../environments/environment';

// import { APP_PAGE_ROUTES } from '@pwm/pages';

// const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
// ];

const DEFAULT_PAGE_ROUTE = 'dashboard';
const APP_PAGE_ROUTES: Routes = [
  { path: 'dashboard', children: DASHBOARD_PAGE_ROUTES },
];

if (!environment.production) {
  APP_PAGE_ROUTES.push({
    path: 'sandbox',
    children: SANDBOX_PAGE_ROUTES,
    // loadChildren: () => import('@pwm/pages').then((m) => m.SandboxPageModule),
  });
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: DEFAULT_PAGE_ROUTE,
        pathMatch: 'full',
      },
      ...APP_PAGE_ROUTES,
    ],
  },
  { path: '**', redirectTo: DEFAULT_PAGE_ROUTE },
  //  { path: '404', component: NotfoundComponent },
  //  { path: '**', redirectTo: '/404' }
];

/** @see https://stackoverflow.com/questions/38964450/how-to-bootstrap-with-hashlocationstrategy-in-angular-2-rc5 */
export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
