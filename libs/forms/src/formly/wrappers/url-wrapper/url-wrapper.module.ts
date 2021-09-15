import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
// TODO: Fix import not working - (Circular dependency between "forms" and "components" detected: forms -> components -> forms)
import { ServiceIconModule } from '@pwm/components';
// import { ServiceIconModule} from '../../../../../components/src/lib/service-icon'
import { UrlWrapperComponent } from './url-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    ServiceIconModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'url-wrapper',
          component: UrlWrapperComponent,
        },
      ],
    }),
  ],
  declarations: [UrlWrapperComponent],
  exports: [UrlWrapperComponent],
})
export class UrlWrapperModule {}
