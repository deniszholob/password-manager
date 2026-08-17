// import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

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

/** Internal lib use only, do not export outside lib */
@NgModule({
  imports: [...MODULE_IMPORT_EXPORT, FormlyModule],
  exports: [...MODULE_IMPORT_EXPORT, FormlyModule],
})
export class CustomFormlyModule {}
