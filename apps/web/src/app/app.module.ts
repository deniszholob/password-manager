import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesModule } from '@pwm/pages';
import { ENV_CONFIG } from '@pwm/util';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { APP_BUILD_DATE, APP_BUILD_VERSION } from './app.build';

@NgModule({
  imports: [BrowserModule, PagesModule, AppRoutingModule],
  declarations: [AppComponent],
  providers: [
    { provide: ENV_CONFIG, useValue: environment },
    { provide: 'BUILD_VERSION', useValue: APP_BUILD_VERSION },
    { provide: 'BUILD_DATE', useValue: APP_BUILD_DATE },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
