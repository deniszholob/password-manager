import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SearchHeaderComponent } from './search-header.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgSelectModule],
  declarations: [SearchHeaderComponent],
  exports: [SearchHeaderComponent],
})
export class SearchHeaderModule {}
