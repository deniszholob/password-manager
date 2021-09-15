import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesModule } from '@pwm/pages';
import { ENV_CONFIG } from '@pwm/util';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [BrowserModule, PagesModule, AppRoutingModule],
  declarations: [AppComponent],
  providers: [
    {
      provide: ENV_CONFIG,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
