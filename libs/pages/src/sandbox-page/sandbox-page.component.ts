import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SandboxPageService } from './sandbox-page.service';

@Component({
  selector: 'pwm-sandbox-page',
  templateUrl: './sandbox-page.component.html',
})
export class SandboxPageComponent implements OnInit, OnDestroy {
  // #region Class Properties
  private readonly clearSub$ = new Subject<void>();
  // #endregion

  // #region Constructor + Lifecycle
  constructor(private sandboxPageService: SandboxPageService) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.clearSub$.next();
    this.clearSub$.complete();
  }
  // #endregion

  // #region Template Methods

  // #endregion

  // #region Helper Methods

  // #endregion
}
