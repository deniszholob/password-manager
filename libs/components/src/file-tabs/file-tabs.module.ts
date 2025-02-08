import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileTabsComponent } from './file-tabs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FileTabsComponent],
  exports: [FileTabsComponent],
})
export class FileTabsModule {}
