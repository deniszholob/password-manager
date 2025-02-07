import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilePickerComponent } from './file-picker.component';
import { FilePickerDirective } from './file-picker.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FilePickerComponent, FilePickerDirective],
  exports: [FilePickerComponent, FilePickerDirective],
})
export class FilePickerModule {}
