import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@pwm/components';
import { EntryFormModule } from '@pwm/forms';

import { LayoutModule } from './layout';
import { SandboxPageComponent } from './sandbox-page.component';

@NgModule({
  imports: [CommonModule, LayoutModule, ComponentsModule, EntryFormModule],
  declarations: [SandboxPageComponent],
  exports: [SandboxPageComponent],
})
export class SandboxPageModule {}
