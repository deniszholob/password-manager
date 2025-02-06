import { Component, Inject } from '@angular/core';

@Component({
  selector: 'pwm-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    @Inject('BUILD_VERSION') public version: string,
    @Inject('BUILD_DATE') public date: number
  ) {
    console.log({ version, date, dateString: new Date(date).toISOString() });
  }
}
