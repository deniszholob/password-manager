import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickToCopyComponent } from './click-to-copy.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ClickToCopyComponent],
  exports: [ClickToCopyComponent],
})
export class ClickToCopyModule {}
