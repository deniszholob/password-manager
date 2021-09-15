import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsFormModule } from '@pwm/forms';

import { SettingsEditComponent } from './settings-edit.component';
import { FileSelectionModule } from '@pwm/components';

@NgModule({
  imports: [CommonModule, SettingsFormModule, FileSelectionModule],
  declarations: [SettingsEditComponent],
  exports: [SettingsEditComponent],
})
export class SettingsEditModule {}
