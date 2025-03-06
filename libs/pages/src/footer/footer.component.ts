import { Component, Inject } from '@angular/core';
import { AppData, AppStore } from '@pwm/util';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { APP_INFO, AppInfo } from '../pages.data';
import { HyperLink } from '@pwm/components';

@Component({
  selector: 'pwm-footer',
  templateUrl: './footer.component.html',
  styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  // host: { class: 'contents' },
})
export class FooterComponent {
  // #region Class Properties
  private readonly clearSub$: Subject<void> = new Subject<void>();
  public readonly APP_INFO: AppInfo = APP_INFO;
  public readonly LINKS_CONNECT: HyperLink[] = [
    APP_INFO.discord,
    APP_INFO.github,
  ];
  public readonly LINKS_DONATE: HyperLink[] = [APP_INFO.kofi, APP_INFO.patreon];

  private appStore$: Observable<AppData | null> = this.appStore.getStore();
  public appData?: AppData;
  // #endregion

  // #region Constructor + Lifecycle
  constructor(
    private appStore: AppStore,
    @Inject('BUILD_VERSION') public version: string,
    @Inject('BUILD_DATE') public date: number
  ) {
    this.subAppData();
  }

  public ngOnDestroy(): void {
    this.clearSub$.next();
    this.clearSub$.complete();
  }
  // #endregion

  // #region Data
  private subAppData(): void {
    this.appStore$
      .pipe(takeUntil(this.clearSub$))
      .subscribe((appData: AppData | null): void => {
        this.appData = appData ?? undefined;
      });
  }
  // #endregion
}
