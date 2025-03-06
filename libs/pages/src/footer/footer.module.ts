import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';
import { LinkModule } from '@pwm/components';

@NgModule({
  imports: [CommonModule, LinkModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
