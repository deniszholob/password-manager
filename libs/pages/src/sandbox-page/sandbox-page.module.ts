import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@pwm/components';
import { EntryFormModule } from '@pwm/forms';

import { SandboxPageComponent } from './sandbox-page.component';

@NgModule({
  imports: [CommonModule, ComponentsModule, EntryFormModule],
  declarations: [SandboxPageComponent],
  exports: [SandboxPageComponent],
})
export class SandboxPageModule {}
