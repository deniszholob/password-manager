import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryEditComponent } from './entry-edit.component';
// import { ServiceIconModule } from '../service-icon';
// import { ClickToCopyModule } from '../click-to-copy';
import { EntryFormModule } from '@pwm/forms';

@NgModule({
  imports: [
    CommonModule,
    EntryFormModule,
    // ServiceIconModule,
    // ClickToCopyModule,
  ],
  declarations: [EntryEditComponent],
  exports: [EntryEditComponent],
})
export class EntryEditModule {}
