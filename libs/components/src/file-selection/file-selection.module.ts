import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilePickerModule } from '../file-picker';
import { FileSelectionComponent } from './file-selection.component';

@NgModule({
  imports: [CommonModule, FilePickerModule],
  declarations: [FileSelectionComponent],
  exports: [FileSelectionComponent],
})
export class FileSelectionModule {}
