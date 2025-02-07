import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DataStoreService,
  FileData,
  getIconSrcOptionsArray,
  getIconSrcOptionValuesArray,
  IconSrcOptions,
  SettingsData,
  SettingsStore,
  DataService,
} from '@pwm/util';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GITHUB } from '../pages.data';

@Component({
  selector: 'pwm-landing-page',
  templateUrl: './landing-page.component.html',
  // styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  public GITHUB = GITHUB;
  private subscription: Subscription = new Subscription();
  public appTitle = 'Password Manager';

  public data$ = this.dataStore.getStore();
  public settings$ = this.settingsStore.getStore();

  public error: string | null = null;
  public loading: string | null = null;

  constructor(
    private dataService: DataService,
    private dataStore: DataStoreService,
    private settingsStore: SettingsStore,
    private router: Router,
    @Inject('BUILD_VERSION') public version: string,
    @Inject('BUILD_DATE') public date: number
  ) {}

  ngOnInit(): void {
    this.subSettings();
    this.subData();

    // this.readOpenedFile();
    this.initReadSettings();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ======================================================================== //
  // ============================= Data ===================================== //

  private subSettings() {
    // console.log(`subSettings()`)
    const sub = this.settings$.subscribe(
      (settings: SettingsData | null) => {
        // console.log(`  Settings Sub`, settings);
        if (settings) {
          const valid = this.checkValidSettings(settings);
          if (valid && settings.dataFile) {
            this.initReadData(settings.dataFile);
          }
        }
      },
      (err) => {
        // console.error(`  subSettings() settings$ fail - `, err);
        this.error = err;
      }
    );
    this.subscription.add(sub);
  }

  private subData() {
    // console.log(`subData()`)
    const sub = this.data$.subscribe(
      (file: FileData | null) => {
        // console.log(`  Data Sub`, file);
        if (file) {
          this.navToMain();
        }
      },
      (err) => {
        // console.error(`  subData() data$ fail - `, err);
        this.error = err;
        if (err instanceof SyntaxError) {
          this.error = `  Error reading file, please try again or start a new one.`;
        } else {
          this.error = err;
        }
        console.warn(this.error);
      }
    );
    this.subscription.add(sub);
  }

  // ======================================================================== //
  // ============================= Component ================================ //

  private checkValidSettings(settings: SettingsData): boolean {
    // console.log(`checkValidSettings() - `, settings);
    let valid = true;

    if (!getIconSrcOptionValuesArray().includes(settings.defaultIconSrc)) {
      valid = false;
      settings.defaultIconSrc = IconSrcOptions.fontawesome;
    }

    if (!valid) {
      this.loading = 'Saving Settings...';
      this.error = null;
      this.dataService.saveSettings(settings).subscribe(
        () => {
          // console.log('checkValidSettings() saveData() success');
          this.loading = null;
        },
        (err) => {
          // console.error(`checkValidSettings() saveData() fail - `, err);
          this.loading = null;
          this.error = err;
        }
      );
    }

    return valid;
  }

  public readOpenedFile() {
    // console.log(`readOpenedFile()`);
    this.loading = 'Reading Opened File...';
    this.error = null;
    this.dataService.readOpenedFile().subscribe(
      (res) => {
        // console.log('  Opened File Read Done: ', res);
        this.initReadSettings();
        this.loading = null;
      },
      (err) => {
        console.error(`  readOpenedFile() readOpenedFile() fail - `, err);
        this.loading = null;
        this.error = err;
      }
    );
  }

  private initReadSettings() {
    // console.log(`initReadSettings()`);
    this.loading = 'Reading Settings...';
    this.error = null;

    this.dataService.readSettings().subscribe(
      (res) => {
        // console.log('  Settings Read Done: ', res)
        this.loading = null;
      },
      (err) => {
        // console.error(`  initReadSettings() readSettings() fail - `, err);
        this.loading = null;
        this.error = err;
      }
    );
  }

  private initReadData(location: string, file?: File) {
    // console.log(`initReadData() - `, location, file);
    this.loading = 'Reading Data...';
    this.error = null;

    this.dataService
      .readData(location, file)
      .pipe(
        catchError((err) => {
          // console.error(`  initReadData() readData() catchError - `, err);
          if (err instanceof SyntaxError) {
            this.error = `  Error reading file, please try again or start a new one.`;
          } else {
            this.error = err;
          }
          return of(null);
        })
      )
      .subscribe(
        (res) => {
          // console.log('  File Read Done')
          this.loading = null;
        },
        (err) => {
          // console.error(`  initReadData() readData() fail - `, err);
          this.loading = null;
          this.error = err;
        }
      );
  }

  // ======================================================================== //
  // ============================= Misc ===================================== //

  private navToMain() {
    // console.log('!!!! Nav to dashboard request');
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
}
