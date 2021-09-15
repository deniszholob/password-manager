import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pwm-form-debug',
  templateUrl: './form-debug.component.html',
  // styleUrls: ['./form-debug.component.scss'],
})
export class FormDebugComponent {
  @Input()
  public form: FormGroup;
  @Input()
  public model: unknown;

  public submittedValue: any = null;
  public submittedDate: any = null;
}
