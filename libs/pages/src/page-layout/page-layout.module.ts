import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageLayoutComponent } from './page-layout.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PageLayoutComponent],
  exports: [PageLayoutComponent],
})
export class PageLayoutModule {}
