import { NgModule } from '@angular/core';

import { DashboardPageModule } from './dashboard-page';
import { LandingPageModule } from './landing-page';
import { SandboxPageModule } from './sandbox-page';

@NgModule({
  exports: [DashboardPageModule, LandingPageModule, SandboxPageModule],
})
export class PagesModule {}
