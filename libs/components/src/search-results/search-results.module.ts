import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsComponent } from './search-results.component';
import { EntryModule } from '../entry';

@NgModule({
  imports: [CommonModule, EntryModule],
  declarations: [SearchResultsComponent],
  exports: [SearchResultsComponent],
})
export class SearchResultsModule {}
