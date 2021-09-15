import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@pwm/components';
// import { DataModule } from '@pwm/util';

import { LandingPageComponent } from './landing-page.component';

@NgModule({
  imports: [CommonModule, ComponentsModule, FormsModule],
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}
