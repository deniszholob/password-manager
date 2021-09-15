import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormDebugModule } from '../_form-debug';
import { CustomFormlyModule } from '../../formly/custom-formly.module';
import { EntryFormComponent } from './entry-form.component';

@NgModule({
  imports: [CommonModule, CustomFormlyModule, FormDebugModule],
  declarations: [EntryFormComponent],
  exports: [EntryFormComponent],
})
export class EntryFormModule {}
