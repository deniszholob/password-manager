import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'pwm-recovery-questions',
  templateUrl: './recovery-questions.component.html',
  // styleUrls: ['./recovery-questions.component.scss'],
})
export class RecoveryQuestionsComponent extends FieldArrayType {
  constructor() {
    super();
  }
}
