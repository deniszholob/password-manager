import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

import { RecoveryQuestionsComponent } from './recovery-questions.component';

@NgModule({
  imports: [
    CommonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'recovery-questions',
          component: RecoveryQuestionsComponent,
        },
      ],
    }),
  ],
  declarations: [RecoveryQuestionsComponent],
  exports: [RecoveryQuestionsComponent],
})
export class RecoveryQuestionsModule {}
