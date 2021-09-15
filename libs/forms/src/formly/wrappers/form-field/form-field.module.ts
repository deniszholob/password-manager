import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from './form-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormlyModule.forChild({
      wrappers: [
        {
          name: 'form-field',
          component: FormFieldComponent,
        },
      ],
    }),
  ],
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent],
})
export class FormFieldModule {}
