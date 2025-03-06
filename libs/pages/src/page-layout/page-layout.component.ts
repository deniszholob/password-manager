import { Component, Inject } from '@angular/core';
import { DataService } from '@pwm/util';
import { APP_INFO, WEB_WARNING } from '../pages.data';

@Component({
  selector: 'pwm-page-layout',
  templateUrl: './page-layout.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
})
export class PageLayoutComponent {
  public readonly GITHUB: string = APP_INFO.github.url;
  public WEB_WARNING: string | null = null;

  constructor(
    private dataService: DataService,
    @Inject('BUILD_VERSION')
    public version: string,
    @Inject('BUILD_DATE')
    public date: number
  ) {
    this.WEB_WARNING = !this.dataService.isElectron() ? WEB_WARNING : null;
  }
}
