import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AppData,
  AppStore,
  DataStore,
  Entry,
  FileData,
  getGuid,
  getIconSrcOptionValuesArray,
  mockSavedFile,
  SettingsData,
  SettingsStore,
  StateService,
} from '@pwm/util';
import { Observable, Subscription } from 'rxjs';

const WEB_WARNING = `DO NOT Enter sensitive information, this is a demo only!`;
const GITHUB = `https://github.com/deniszholob?tab=repositories`;
const ENTRY_MOCK: Entry = mockSavedFile[0];

/** TODO: Autocomplete
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
 */
@Component({
  selector: 'pwm-dashboard',
  templateUrl: './dashboard-page.component.html',
  // styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public GITHUB = GITHUB;
  public WEB_WARNING: string = null;
  private _searchQuery = '';
  private subscription: Subscription = new Subscription();

  // ======================================================================== //

  public fileData: Entry[] = [];
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

  public error: string | null = null;
  public loading: string | null = null;

  // Store state management stuff
  public data$: Observable<FileData> = this.dataStore.getStore();
  public settings$: Observable<SettingsData> = this.settingsStore.getStore();
  public allTags$: Observable<string[]> = this.dataStore.getUniqueTagSet();
  public appStore$: Observable<AppData> = this.appStore.getStore();

  public isSettingsOpen = false;

  constructor(
    private stateService: StateService,
    private dataStore: DataStore,
    private settingsStore: SettingsStore,
    private appStore: AppStore,
    private router: Router
  ) {
    this.WEB_WARNING = !this.stateService.isElectron() ? WEB_WARNING : null;
  }

  // TODO: Add auto select on input fields
  // (click)="$event.target.select()"
  // #myInput (click)="myInput.select()"

  ngOnInit(): void {
    this.subData();
    this.searchQuery = '';

    // TODO: Remove/comment out for production
    // for (let i = 0; i < 5; i++) {
    //   this.fileData.push({
    //     ...ENTRY_MOCK,
    //     serviceName: `New-${this.fileData.length}`,
    //   });
    // }
    // this.searchQuery = '';
    // this.detailEntry = this.newEntry || this.filteredSearchResults[0];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ======================================================================== //
  // ============================= Data ===================================== //

  private subData() {
    // console.debug(`subData()`)
    const sub = this.data$.subscribe(
      (data: FileData | null) => {
        // console.log(`Data Sub`, data);
        this.dataReceived(data);
      },
      (err) => {
        // console.error(`subData() data$ fail - `, err);
        this.error = err;
      }
    );
    this.subscription.add(sub);
  }

  private checkValidData(data: FileData) {
    // console.log(`checkValidData() - `, data);

    let valid = true;
    data.forEach((e) => {
      if (!e.guid) {
        valid = false;
        e.guid = this.getUniqueGuid();
      }
      if (!getIconSrcOptionValuesArray().includes(e.iconSrc)) {
        valid = false;
        e.iconSrc = this.settingsStore.getState().defaultIconSrc;
      }
    });

    if (!valid) {
      this.loading = 'Saving Entry...';
      this.error = null;
      this.stateService.saveData(data).subscribe(
        () => {
          // console.log('checkValidData() saveData() success');
          this.loading = null;
        },
        (err) => {
          // console.error(`checkValidData() saveData() fail - `, err);
          this.loading = null;
          this.error = err;
        }
      );
    }
    return valid;
  }

  private dataReceived(data: FileData | null): void {
    // console.log(`dataReceived() - `, data);
    if (!data) {
      this.navToLanding();
      return;
    }

    // Check data validity
    if (this.checkValidData(data)) {
      this.fileData = data;
      this.search();
    }

    // if (data.length <= 0) {
    //   console.log(`Lets create a new entry?`);
    //   this.createNewEntry();
    // } else {
    //   console.log('We have entries!');
    // }
  }

  // ======================================================================== //
  // ============================= Template ================================= //

  public selectEntryDetail(entry: Entry) {
    if (!this.appStore.getState()?.unsavedChanges) {
      this.detailEntry = entry;
    }
  }

  public saveDetailEntry(entry: Entry) {
    // console.log('saveDetailEntry() -', entry);
    this.loading = 'Saving Entry...';
    this.error = null;

    const isAddingNewEntry = this.newEntry && entry.guid === this.newEntry.guid;
    // console.log(`isAddingNewEntry`, isAddingNewEntry);

    if (isAddingNewEntry) {
      this.fileData.push(entry);
    } else {
      const idx = this.fileData.findIndex((e) => entry.guid === e.guid);
      this.fileData[idx] = entry;
    }

    // Save to file
    this.stateService.saveData(this.fileData).subscribe(
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
        // console.error(`saveDetailEntry() saveData() fail - `, err);
        this.loading = null;
        // Rollback add to array
        if (isAddingNewEntry) {
          this.fileData.pop();
        }
        this.error = err;
      }
    );
  }

  public deleteDetailEntry(entry: Entry) {
    // console.log('deleteDetailEntry() -', entry);
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
    const idx = this.fileData.findIndex((e) => entry.guid === e.guid);

    if (idx == null || idx < 0) {
      this.loading = null;
      const errMsg = `Index was null; entry to delete not found`;
      this.error = errMsg;
      throw new Error(errMsg);
    }

    // Delete from array and save deleted entry for rollback
    const deletedEntry = this.fileData.splice(idx, 1)[0];
    // console.log(deletedEntry);

    // Save to file
    this.stateService.saveData(this.fileData).subscribe(
      () => {
        // console.log('deleteDetailEntry() saveData() success');
        this.loading = null;
        this.closeDetailView();
      },
      (err) => {
        // console.error(`deleteDetailEntry() saveData() fail - `, err);
        this.loading = null;
        // Rollback delete from array
        this.fileData.splice(idx, 0, deletedEntry);
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
    // console.log('addEntry()');
    this.fileData.push();
  }

  private getUniqueGuid(): string {
    // console.log('getUniqueGuid()');
    let guid = getGuid();
    let tries = 0;

    while (this.fileData.findIndex((e) => e.guid === guid) >= 0 || tries > 10) {
      console.warn(`Found clashing guid `, guid);
      guid = getGuid();
      tries++;
    }

    if (this.fileData.findIndex((e) => e.guid === guid) >= 0 && tries >= 10) {
      throw Error('Could not generate a unique guid for new entry');
    }

    return guid;
  }

  public createNewEntry() {
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
      serviceName: `New-${this.fileData.length}`,
      iconSrc: this.settingsStore.getState().defaultIconSrc,
    };
    this.detailEntry = this.newEntry;
    // this.selectedIdx = -1;
  }

  // ======================================================================== //
  // ============================= Search =================================== //

  public clearSearch() {
    // console.log('clearSearch()');
    this.searchQuery = '';
  }

  private search(query?: string) {
    // console.log('search() - ', query);
    const q: string = query || this.searchQuery.toLocaleLowerCase() || '';
    this.filteredSearchResults = this.fileData
      // Tags
      .filter((value) => {
        // console.log('Tags Filter');
        if (!this.searchFilters || this.searchFilters.length <= 0) return true;
        // console.log('Tags Filter Cont1');
        if (!value.tags || value.tags.length <= 0) return false;
        // console.log('Tags Filter Cont2');

        return this.searchFilters
          .map((t) => {
            return value.tags.includes(t);
          })
          .reduce((prev, curr) => prev && curr);
      })
      // Search Query
      .filter((value) => {
        // console.log('Search Filter');
        return (
          value.email?.toLocaleLowerCase().includes(q) ||
          value.serviceName?.toLocaleLowerCase().includes(q) ||
          (value.username && value.username?.toLocaleLowerCase().includes(q)) ||
          (value.serviceUrl &&
            value.serviceUrl?.toLocaleLowerCase().includes(q))
        );
      });
  }

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
    return this.fileData.length > 0 || !!this.newEntry;
  }

  private navToLanding() {
    // console.log('!!!! Nav to landing request');
    this.router.navigate(['/landing'], { replaceUrl: true });
  }

  // (ngModelChange)="data = $event"
  // public dataChange(event: Event) {
  //   console.log(`dataChange(${event})`);
  //   this.data = event;
  // }

  // ======================================================================== //
  // ============================= OLD ===================================== //
  // ======================================================================== //

  public saveDetailEntry_OLD(e: Entry) {
    // console.log('saveDetailEntry() -', e);
    this.loading = 'Saving Entry...';
    this.error = null;

    // Add to array if new entry
    if (this.newEntry && this.detailEntry === this.newEntry) {
      this.fileData.push(this.newEntry);
    }

    // Save to file
    this.stateService.saveData(this.fileData).subscribe(
      () => {
        // console.log('saveDetailEntry() saveData() success');
        this.loading = null;
        // Clear new entry now that its saved
        if (this.detailEntry === this.newEntry) {
          this.newEntry = null;
        }
        this.closeDetailView();
      },
      (err) => {
        // console.error(`saveDetailEntry() saveData() fail - `, err);
        this.loading = null;
        // Rollback add to array
        if (this.newEntry && this.detailEntry === this.newEntry) {
          this.fileData.pop();
        }
        this.error = err;
      }
    );
  }

  public deleteDetailEntry_OLD(e: Entry) {
    // console.log('deleteDetailEntry() -', e);
    this.loading = 'Deleting Entry...';
    this.error = null;

    if (this.detailEntry === this.newEntry) {
      this.loading = null;
      // New entries are temps and not saved into the store, so just dereference
      this.newEntry = null;
      this.closeDetailView();
      return;
    }

    // Get index of entry to delete
    const idx = this.fileData.findIndex((entry) => entry === this.detailEntry);

    if (idx == null) {
      this.loading = null;
      const errMsg = `Index was null; entry to delete not found`;
      this.error = errMsg;
      throw new Error(errMsg);
    }

    // Delete from array and save deleted entry for rollback
    const entry = this.fileData.splice(idx, 1)[0];

    // Save to file
    this.stateService.saveData(this.fileData).subscribe(
      () => {
        // console.log('deleteDetailEntry() saveData() success');
        this.loading = null;
        this.closeDetailView();
      },
      (err) => {
        // console.error(`deleteDetailEntry() saveData() fail - `, err);
        this.loading = null;
        // Rollback delete from array
        this.fileData.splice(idx, 0, entry);
        this.error = err;
      }
    );
  }
}
