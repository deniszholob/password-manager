import { NgModule } from '@angular/core';

import { DashboardPageModule } from './dashboard-page';
import { SandboxPageModule } from './sandbox-page';

@NgModule({
  exports: [DashboardPageModule, SandboxPageModule],
})
export class PagesModule {}
