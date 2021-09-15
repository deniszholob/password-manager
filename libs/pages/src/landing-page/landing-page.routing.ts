import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';

export const LANDING_PAGE_ROUTES: Routes = [{ path: '', component: LandingPageComponent }];

export const LandingRoutingModule = RouterModule.forChild(LANDING_PAGE_ROUTES);
