import { NgModule } from '@angular/core';

import { EntryModule } from './entry';
import { FilePickerModule } from './file-picker';
import { FileSelectionModule } from './file-selection';
import { SearchHeaderModule } from './search-header';
import { SearchResultsModule } from './search-results';
import { ServiceIconModule } from './service-icon';

@NgModule({
  exports: [
    FilePickerModule,
    FileSelectionModule,
    EntryModule,
    SearchResultsModule,
    SearchHeaderModule,
    ServiceIconModule,
  ],
})
export class ComponentsModule {}
