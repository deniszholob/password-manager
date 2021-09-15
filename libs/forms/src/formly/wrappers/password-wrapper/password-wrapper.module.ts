import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

import { PasswordWrapperComponent } from './password-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'password-wrapper',
          component: PasswordWrapperComponent,
        },
      ],
    }),
  ],
  declarations: [PasswordWrapperComponent],
  exports: [PasswordWrapperComponent],
})
export class PasswordWrapperModule {}
