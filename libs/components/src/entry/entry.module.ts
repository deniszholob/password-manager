import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ClickToCopyModule } from '../click-to-copy';
import { ServiceIconModule } from '../service-icon';
import { EntryComponent } from './entry.component';

@NgModule({
  imports: [
    CommonModule,
    NgbTooltipModule,
    ServiceIconModule,
    ClickToCopyModule,
  ],
  declarations: [EntryComponent],
  exports: [EntryComponent],
})
export class EntryModule {}
