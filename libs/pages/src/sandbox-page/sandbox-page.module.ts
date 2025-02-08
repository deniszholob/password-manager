import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@pwm/components';
import { EntryFormModule } from '@pwm/forms';

import { LayoutModule } from './layout';
import { SandboxPageComponent } from './sandbox-page.component';
import { PageLayoutModule } from '../page-layout/page-layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    EntryFormModule,
    PageLayoutModule,
  ],
  declarations: [SandboxPageComponent],
  exports: [SandboxPageComponent],
})
export class SandboxPageModule {}
