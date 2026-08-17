import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { DashboardPageModule, SandboxPageModule } from '@pwm/pages';
import { FORMLY_CONFIG } from '@pwm/forms';
import { ENV_CONFIG } from '@pwm/util';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { APP_BUILD_DATE, APP_BUILD_VERSION } from './app.build';

const APP_PAGE_MODULES = [DashboardPageModule];

if (!environment.production) {
  APP_PAGE_MODULES.push(SandboxPageModule);
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormlyModule.forRoot(FORMLY_CONFIG),
    ...APP_PAGE_MODULES,
  ],
  declarations: [AppComponent],
  providers: [
    { provide: ENV_CONFIG, useValue: environment },
    { provide: 'BUILD_VERSION', useValue: APP_BUILD_VERSION },
    { provide: 'BUILD_DATE', useValue: APP_BUILD_DATE },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
