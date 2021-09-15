import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@pwm/components';

import { DashboardPageComponent } from './dashboard-page.component';
import { EntryEditModule } from './entry-edit';
import { SettingsEditModule } from './settings-edit';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    EntryEditModule,
    SettingsEditModule,
  ],
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
})
export class DashboardPageModule {}
