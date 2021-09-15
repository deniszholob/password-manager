import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page.component';

export const DASHBOARD_PAGE_ROUTES: Routes = [{ path: '', component: DashboardPageComponent }];

export const DashboardRouteModule = RouterModule.forChild(DASHBOARD_PAGE_ROUTES);
