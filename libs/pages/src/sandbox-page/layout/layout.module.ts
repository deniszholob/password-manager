import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
