import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ComponentsModule,
  FilePickerModule,
  FileTabsModule,
} from '@pwm/components';

import { DashboardPageComponent } from './dashboard-page.component';
import { EntryEditModule } from './entry-edit';
import { SettingsEditModule } from './settings-edit';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ComponentsModule,
    FormsModule,
    // Internal - pages
    FooterModule,
    EntryEditModule,
    SettingsEditModule,
    // Internal - components
    FilePickerModule,
    FileTabsModule,
  ],
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
})
export class DashboardPageModule {}
