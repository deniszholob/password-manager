// import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ConfigOption, FormlyModule } from '@ngx-formly/core';

import { OpenMultiSelectModule, RecoveryQuestionsModule } from './templates';
import { PasswordWrapperModule, UrlWrapperModule } from './wrappers';
import { FormFieldModule } from './wrappers/form-field/form-field.module';

const MODULE_IMPORT_EXPORT = [
  ReactiveFormsModule,
  FormlyBootstrapModule,
  // FormlyMaterialModule,
  RecoveryQuestionsModule,
  OpenMultiSelectModule,
  FormFieldModule,
  PasswordWrapperModule,
  UrlWrapperModule,
];
const FORMLY_CONFIG: ConfigOption = {
  extras: { lazyRender: true },
  validationMessages: [
    {
      name: 'required',
      message: 'This field is required',
    },
    {
      name: 'email',
      message: 'Email not valid',
    },
    {
      name: 'url',
      message: 'Url not valid, make sure you include "https://"',
    },
    {
      name: 'option',
      message: 'Value not valid, must be one of available options',
    },
  ],
};

/** Internal lib use only, do not export outside lib */
@NgModule({
  imports: [...MODULE_IMPORT_EXPORT, FormlyModule.forRoot(FORMLY_CONFIG)],
  exports: [...MODULE_IMPORT_EXPORT, FormlyModule],
})
export class CustomFormlyModule {}
