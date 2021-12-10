import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule, SELECTION_MODEL_FACTORY } from '@ng-select/ng-select';
import { SelectionModelFactory } from '@ng-select/ng-select/lib/selection-model';

import { MultiSelectComponent } from './multi-select.component';
import { CustomSelectionFactory } from './selection.model';

@NgModule({
  imports: [CommonModule, NgSelectModule, ReactiveFormsModule, FormsModule],
  providers: [
    // {
    //   provide: SELECTION_MODEL_FACTORY,
    //   useValue: <SelectionModelFactory>CustomSelectionFactory,
    // },
  ],
  declarations: [MultiSelectComponent],
  exports: [MultiSelectComponent],
})
export class MultiSelectModule {}
