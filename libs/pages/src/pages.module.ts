import { NgModule } from '@angular/core';

import { DashboardPageModule } from './dashboard-page';
import { SandboxPageModule } from './sandbox-page';

@NgModule({
  imports: [DashboardPageModule, SandboxPageModule],
  exports: [DashboardPageModule, SandboxPageModule],
})
export class PagesModule {}
