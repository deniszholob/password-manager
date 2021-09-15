import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

// TODO: WIP - use to replace the bootstrap theme
@Component({
  selector: 'pwm-form-field',
  templateUrl: './form-field.component.html',
  // styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent extends FieldWrapper {}
