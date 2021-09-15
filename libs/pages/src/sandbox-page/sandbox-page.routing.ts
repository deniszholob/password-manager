import { RouterModule, Routes } from '@angular/router';
import { SandboxPageComponent } from './sandbox-page.component';

export const SANDBOX_PAGE_ROUTES: Routes = [
  { path: '', component: SandboxPageComponent },
];

export const SandboxRoutingModule = RouterModule.forChild(SANDBOX_PAGE_ROUTES);
