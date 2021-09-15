import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';

import { OpenMultiSelectComponent } from './open-multi-select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'open-multi-select',
          component: OpenMultiSelectComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
  declarations: [OpenMultiSelectComponent],
  exports: [OpenMultiSelectComponent],
})
export class OpenMultiSelectModule {}
