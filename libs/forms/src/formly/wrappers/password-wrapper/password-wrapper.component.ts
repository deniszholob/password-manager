import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'pwm-password-wrapper',
  templateUrl: './password-wrapper.component.html',
  // styleUrls: ['./password-wrapper.component.scss'],
})
export class PasswordWrapperComponent extends FieldWrapper {
  public passwordFieldType = true;

  public togglePasswordReveal() {
    this.passwordFieldType = !this.passwordFieldType;
    this.to.type = this.passwordFieldType ? 'password' : 'text';
  }
}
