import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormDebugModule } from '../_form-debug';
import { CustomFormlyModule } from '../../formly/custom-formly.module';
import { SettingsFormComponent } from './settings-form.component';

@NgModule({
  imports: [CommonModule, CustomFormlyModule, FormDebugModule],
  declarations: [SettingsFormComponent],
  exports: [SettingsFormComponent],
})
export class SettingsFormModule {}
