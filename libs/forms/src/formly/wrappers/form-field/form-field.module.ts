import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from './form-field.component';
import { ClickToCopyModule } from '@pwm/components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickToCopyModule,
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
