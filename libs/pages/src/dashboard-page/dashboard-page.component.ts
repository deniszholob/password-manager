import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AppData,
  AppStore,
  DataStoreService,
  Entry,
  FileData,
  getGuid,
  getIconSrcOptionValuesArray,
  RawFileIOService,
  SettingsData,
  SettingsStore,
  DataService,
  slash,
  DEFAULT_SETTINGS,
  settingsValidator,
  FileDisplay,
} from '@pwm/util';
import { Observable, of, Subject } from 'rxjs';
import { APP_TITLE, GITHUB } from '../pages.data';
import { FieldCheckOptions } from '@pwm/components';
import { catchError, take, takeUntil, tap } from 'rxjs/operators';

const WEB_WARNING = `DO NOT Enter sensitive information, this is a demo only!`;
// const ENTRY_MOCK: Entry|undefined = mockSavedFile[0];

/** TODO: Autocomplete
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
 */
@Component({
  selector: 'pwm-dashboard',
  templateUrl: './dashboard-page.component.html',
  // styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  // #region Class Properties
  private readonly clearSub$ = new Subject<void>();
  public readonly APP_TITLE: string = APP_TITLE;
  public readonly GITHUB: string = GITHUB;
  public WEB_WARNING: string | null = null;
  private _searchQuery: string = '';

  // ======================================================================== //

  public fileData?: FileData;
  public filteredSearchResults: Entry[] = [];
  public detailEntry: Entry | null = null;
  // public selectedIdx: number | null = -1;
  public newEntry: Entry | null = null;

  public set searchQuery(q: string) {
    this._searchQuery = q || '';
    this.search(this._searchQuery);
  }
  public get searchQuery() {
    return this._searchQuery;
  }

  private _searchFilters: string[] = [];
  public set searchFilters(f: string[]) {
    // console.log(`searchFilters() -`, f);
    this._searchFilters = f;
    this.search();
  }
  public get searchFilters() {
    return this._searchFilters;
  }

  private _fieldChecks?: FieldCheckOptions;
  public set fieldChecks(f: FieldCheckOptions | undefined) {
    // console.log(`fieldChecks() -`, f);
    this._fieldChecks = f;
    this.search();
  }
  public get fieldChecks() {
    return this._fieldChecks;
  }

  public error: string | null = null;
  public loading: string | null = null;

  // Store state management stuff
  public data$: Observable<FileData | null> = this.dataStore.getStore();
  public settings$: Observable<SettingsData | null> =
    this.settingsStore.getStore();
  public allTags$: Observable<string[]> = this.dataStore.getUniqueTagSet();
  public appStore$: Observable<AppData | null> = this.appStore.getStore();

  public appData?: AppData;

  private settingsData?: SettingsData;
  public isSettingsOpen: boolean = false;

  public selectedFile?: FileDisplay;
  public pinnedFiles: FileDisplay[] = [];
  public recentFiles: FileDisplay[] = [];

  // #endregion

  // #region Constructor + Lifecycle
  constructor(
    private rawFileIOService: RawFileIOService,
    private dataService: DataService,
    private dataStore: DataStoreService,
    private settingsStore: SettingsStore,
    private appStore: AppStore,
    private router: Router,
    @Inject('BUILD_VERSION') public version: string,
    @Inject('BUILD_DATE') public date: number
  ) {
    this.WEB_WARNING = !this.dataService.isElectron() ? WEB_WARNING : null;
    this.subSettings();
    this.subData();
    this.subAppData();
    this.searchQuery = '';

    this.initReadSettings();
    // TODO: Remove or comment out for production
    // for (let i = 0; i < 5; i++) {
    //   this.fileData.push({
    //     ...ENTRY_MOCK,
    //     serviceName: `New-${this.fileData.length}`,
    //   });
    // }
    // this.searchQuery = '';
    // this.detailEntry = this.newEntry || this.filteredSearchResults[0];
  }

  // TODO: Add auto select on input fields
  // (click)="$event.target.select()"
  // #myInput (click)="myInput.select()"

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.clearSub$.next();
    this.clearSub$.complete();
  }
  // #endregion

  // #region Data
  // ======================================================================== //
  // ============================= Data ===================================== //

  private initReadSettings(): void {
    // console.log(`initReadSettings()`);
    this.loading = 'Reading Settings...';
    this.error = null;

    this.dataService.readSettings().subscribe(
      (res) => {
        // console.log('  Settings Read Done: ', res)
        this.loading = null;
      },
      (err) => {
        console.error(`  initReadSettings() readSettings() fail - `, err);
        this.loading = null;
        this.error = err;
      }
    );
  }

  private subAppData(): void {
    this.appStore$
      .pipe(takeUntil(this.clearSub$))
      .subscribe((appData: AppData | null): void => {
        this.appData = appData ?? undefined;
      });
  }

  private subSettings(): void {
    this.settings$
      .pipe(takeUntil(this.clearSub$))
      .subscribe((settings: SettingsData | null): void => {
        console.log(JSON.stringify(settings));
        if (!settings) return;

        const validSettings: boolean = this.checkValidSettings(settings);
        if (!validSettings) return;

        this.settingsData = settings;
        this.recentFiles = settings.recentFiles.map(FileDisplay.fromPath);
        this.pinnedFiles = settings.pinnedFiles.map(FileDisplay.fromPath);

        const selectedFile = settings.dataFile
          ? // ? filePathToFileDisplay(settings.dataFile)
            FileDisplay.fromPath(settings.dataFile)
          : undefined;

        if (!selectedFile) {
          this.fileData = undefined;
          // this.dataReceived(null);
        } else if (selectedFile.path !== this.selectedFile?.path) {
          this.fileData = undefined;
          this.initReadData(selectedFile.path);
        } else {
        }

        this.selectedFile = selectedFile;

        // TODO: Remove if this never happens
        // if (
        //   this.selectedFile &&
        //   !this.pinnedFiles.includes(this.selectedFile)
        // ) {
        //   this.pinnedFiles.push(this.selectedFile);
        // }
      });
  }

  private checkValidSettings(settings: SettingsData): boolean {
    // console.log(`checkValidSettings() - `, settings);
    const settingCorrections: SettingsData | null = settingsValidator(settings);
    if (!settingCorrections) return true;

    console.log(`Applying Settings Corrections and Saving...`);

    this.loading = 'Applying Settings Corrections and Saving...';
    this.error = null;
    this.dataService.saveSettings(settingCorrections).subscribe(
      () => {
        // console.log('checkValidSettings() saveData() success');
        this.loading = null;
      },
      (err) => {
        console.error(`checkValidSettings() saveData() fail - `, err);
        this.loading = null;
        this.error = err;
      }
    );

    return false;
  }

  private subData(): void {
    // console.debug(`subData()`)
    this.data$.pipe(takeUntil(this.clearSub$)).subscribe(
      (data: FileData | null) => {
        // console.log(`Data Sub`, data);
        this.dataReceived(data);
      },
      (err) => {
        console.error(`subData() data$ fail - `, err);
        this.error = err;
      }
    );
  }

  private dataReceived(data: FileData | null): void {
    console.log(`dataReceived() - `, data);
    if (!data) {
      // this.navToLanding();
      return;
    }

    // Check data validity
    if (this.checkValidData(data)) {
      this.fileData = data;
      this.closeDetailView();
    }

    // if (data.length <= 0) {
    //   console.log(`Lets create a new entry?`);
    //   this.createNewEntry();
    // } else {
    //   console.log('We have entries!');
    // }
  }

  private checkValidData(data: FileData): boolean {
    console.log(`checkValidData() - `, data);

    let valid = true;
    data.entries.forEach((e) => {
      if (!e.guid) {
        valid = false;
        e.guid = this.getUniqueGuid();
      }
      if (!e.iconSrc || !getIconSrcOptionValuesArray().includes(e.iconSrc)) {
        valid = false;
        e.iconSrc =
          this.settingsStore.getState()?.defaultIconSrc ??
          DEFAULT_SETTINGS.defaultIconSrc;
      }
    });

    if (!valid) {
      this.loading = 'Saving Entry...';
      this.error = null;
      this.dataService.saveData(data).subscribe(
        () => {
          // console.log('checkValidData() saveData() success');
          this.loading = null;
        },
        (err) => {
          console.error(`checkValidData() saveData() fail - `, err);
          this.loading = null;
          this.error = err;
        }
      );
    }
    return valid;
  }

  // TODO: Copied to file-selection component, reuse somehow?
  private initReadData(location: string): void {
    console.log(`initReadData() - `, location);
    this.loading = 'Reading Data...';
    this.error = null;

    this.dataService
      .readData(location, undefined)
      .pipe(
        catchError((err) => {
          console.error(`  initReadData() readData() catchError - `, err);
          if (err instanceof SyntaxError) {
            this.error = `  Error reading file, please try again or start a new one.`;
          } else {
            this.error = err;
          }
          return of(null);
        })
      )
      .subscribe(
        (): void => {
          // console.log('  File Read Done')
          this.loading = null;
        },
        (err): void => {
          console.error(`  initReadData() readData() fail - `, err);
          this.loading = null;
          this.error = err;
        }
      );
  }
  // #endregion

  // #region Template Methods
  // ======================================================================== //
  // ============================= Template ================================= //

  /** Should update settings to selected file, this should trigger a update of data */
  public onSelectPinnedFile(file: FileDisplay | undefined): void {
    if (!this.settingsData) throw new Error('settingsData is null');

    const newSettingsState: SettingsData = { ...this.settingsData };
    newSettingsState.dataFile = file ? file.path : undefined;
    this.dataService.saveSettings(newSettingsState).subscribe();
  }

  /** Should update settings to selected file, this should trigger a update of data */
  public onRemovePinnedFile(file: FileDisplay): void {
    if (!this.settingsData) throw new Error('settingsData is null');

    const newSettingsState: SettingsData = { ...this.settingsData };
    newSettingsState.pinnedFiles = this.settingsData.pinnedFiles.filter(
      (p) => p !== file.path
    );
    newSettingsState.dataFile =
      newSettingsState.pinnedFiles[newSettingsState.pinnedFiles.length - 1];

    console.log(JSON.stringify(newSettingsState), newSettingsState);
    this.dataService.saveSettings(newSettingsState).subscribe();
  }

  /** Should Switch to file selector view*/
  public onCreateNewFile(): void {
    this.selectedFile = undefined;
  }

  /** TODO: double check this is used */
  public onSelectRecentFile(): void {
    throw new Error('Not implemented');
    // TODO: show recent file list
  }

  public onOpenFile(file: File | null): void {
    if (!file) return;
    this.loading = 'Reading Data...';
    this.error = null;

    const location: string = file.path ? slash(file.path) : file.name;
    console.log(location, file);
    this.dataService
      .readData(location, file)
      .pipe(
        catchError((err: unknown) => {
          console.error(`  initReadData() readData() catchError - `, err);
          if (err instanceof SyntaxError) {
            this.error = `Error reading file, please try again or start a new one.`;
          } else {
            this.error = `${err}`;
          }
          return of(null);
        }),
        tap((): void => {
          this.loading = null;
        }),
        take(1)
      )
      .subscribe();
  }

  public onShowItemInFolder(path: string): void {
    this.error = this.dataService.onShowItemInExplorer(path);
  }

  public selectEntryDetail(entry: Entry | null) {
    if (!this.appStore.getState()?.unsavedChanges) {
      this.detailEntry = entry;
    }
  }

  public saveDetailEntry(entry: Entry) {
    if (!this.fileData) throw new Error('fileData is null');
    const fileData = this.fileData;

    // console.log('saveDetailEntry() -', entry);
    this.loading = 'Saving Entry...';
    this.error = null;

    const isAddingNewEntry = this.newEntry && entry.guid === this.newEntry.guid;
    // console.log(`isAddingNewEntry`, isAddingNewEntry);

    if (isAddingNewEntry) {
      fileData.entries.push(entry);
    } else {
      const idx = this.fileData.entries.findIndex((e) => entry.guid === e.guid);
      fileData.entries[idx] = entry;
    }

    // Save to file
    this.dataService.saveData(fileData).subscribe(
      () => {
        // console.log('saveDetailEntry() saveData() success');
        this.loading = null;
        // Clear new entry now that its saved
        if (isAddingNewEntry) {
          this.newEntry = null;
        }
        this.closeDetailView();
      },
      (err) => {
        console.error(`saveDetailEntry() saveData() fail - `, err);
        this.loading = null;
        // Rollback add to array
        if (isAddingNewEntry) {
          fileData.entries.pop();
        }
        this.error = err;
      }
    );
  }

  public deleteDetailEntry(entry: Entry) {
    // console.log('deleteDetailEntry() -', entry);
    if (!this.fileData) throw new Error('fileData is null');
    const fileData = this.fileData;

    this.loading = 'Deleting Entry...';
    this.error = null;

    const isDeletingNewEntry =
      this.newEntry && entry.guid === this.newEntry.guid;

    if (isDeletingNewEntry) {
      this.loading = null;
      // New entries are temps and not saved into the store, so just dereference
      this.newEntry = null;
      this.closeDetailView();
      return;
    }

    // Get index of entry to delete
    const idx = fileData.entries.findIndex((e) => entry.guid === e.guid);

    if (idx == null || idx < 0) {
      this.loading = null;
      const errMsg = `Index was null; entry to delete not found`;
      this.error = errMsg;
      throw new Error(errMsg);
    }

    // Delete from array and save deleted entry for rollback
    const deletedEntry = fileData.entries.splice(idx, 1)[0];
    // console.log(deletedEntry);

    // Save to file
    this.dataService.saveData(fileData).subscribe(
      () => {
        // console.log('deleteDetailEntry() saveData() success');
        this.loading = null;
        this.closeDetailView();
      },
      (err) => {
        console.error(`deleteDetailEntry() saveData() fail - `, err);
        this.loading = null;
        // Rollback delete from array
        if (deletedEntry) fileData.entries.splice(idx, 0, deletedEntry);
        this.error = err;
      }
    );
  }

  public cancelDetailEntry() {
    // console.log('cancelDetailEntry()');
    this.closeDetailView();
  }

  private closeDetailView() {
    // console.log('closeDetailView()');
    this.detailEntry = null;
    // this.selectedIdx = null;
    this.search();
  }

  public addEntry() {
    if (!this.fileData) throw new Error('fileData is null');
    // console.log('addEntry()');
    this.fileData.entries.push();
  }

  private getUniqueGuid(): string {
    if (!this.fileData) throw new Error('fileData is null');
    // console.log('getUniqueGuid()');
    let guid = getGuid();
    let tries = 0;

    while (
      this.fileData.entries.findIndex((e) => e.guid === guid) >= 0 ||
      tries > 10
    ) {
      console.warn(`Found clashing guid `, guid);
      guid = getGuid();
      tries++;
    }

    if (
      this.fileData.entries.findIndex((e) => e.guid === guid) >= 0 &&
      tries >= 10
    ) {
      throw Error('Could not generate a unique guid for new entry');
    }

    return guid;
  }

  public createNewEntry() {
    if (!this.fileData) throw new Error('fileData is null');
    // console.log('createNewEntry()');

    const ENTRY_EMPTY = {
      guid: this.getUniqueGuid(),
      usedTimes: 0,
      // email: '',
      password: '',
      serviceName: ``,
      // tags: [],
      // recovery: [],
      // serviceUrl: '',
      username: '',
      // notes: '',
    };

    this.newEntry = {
      ...ENTRY_EMPTY,
      serviceName: `New-${this.fileData?.entries.length}`,
      iconSrc: this.settingsStore.getState()?.defaultIconSrc,
    };
    this.detailEntry = this.newEntry;
    // this.selectedIdx = -1;
  }
  // #endregion

  // #region Search
  // ======================================================================== //
  // ============================= Search =================================== //

  public clearSearch() {
    // console.log('clearSearch()');
    this.searchQuery = '';
  }

  private search(query?: string) {
    // if (!this.fileData) throw new Error('fileData is null');
    // console.log('search() - ', query);
    const q: string = (query || this.searchQuery || '').toLocaleLowerCase();
    this.filteredSearchResults = (this.fileData?.entries ?? [])
      // fieldChecks
      .filter((value: Entry): boolean => {
        if (!this.fieldChecks) return true;
        if (this.fieldChecks === 'No Service Name' && !value.serviceName)
          return true;
        if (this.fieldChecks === 'No URL' && !value.serviceUrl) return true;
        if (this.fieldChecks === 'No Email' && !value.email) return true;
        if (this.fieldChecks === 'No Username' && !value.username) return true;
        if (this.fieldChecks === 'No Password' && !value.password) return true;
        return false;
      })
      // Tags
      .filter((value: Entry): boolean => {
        // console.log('Tags Filter');
        if (!this.searchFilters || this.searchFilters.length <= 0) return true;
        // console.log('Tags Filter Cont1');
        if (!value.tags || value.tags.length <= 0) return false;
        // console.log('Tags Filter Cont2');

        return this.searchFilters
          .map((t) => !!value.tags?.includes(t))
          .reduce((prev, curr) => prev && curr);
      })
      // Search Query
      .filter((value: Entry): boolean => {
        // console.log('Search Filter');
        return !!(
          value.serviceName?.toLocaleLowerCase().includes(q) ||
          (value.serviceUrl &&
            value.serviceUrl?.toLocaleLowerCase().includes(q)) ||
          value.email?.toLocaleLowerCase().includes(q) ||
          (value.username && value.username?.toLocaleLowerCase().includes(q)) ||
          (value.notes && value.notes.toLocaleLowerCase().includes(q))
        );
      });
  }
  // #endregion

  // #region Misc
  // ======================================================================== //
  // ============================= Misc ===================================== //

  public toggleSettings(): void {
    this.isSettingsOpen = !this.isSettingsOpen;
  }
  public getIsSettingsOpen(): boolean {
    return this.isSettingsOpen;
  }
  public getIsEditEntryOpen(): boolean {
    return !!this.detailEntry;
  }
  public getIsSearchOpen(): boolean {
    return !!this.fileData?.entries?.length || !!this.newEntry;
  }
  // #endregion
}
