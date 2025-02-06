import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AppData,
  AppStore,
  DataStoreService,
  Entry,
  IconSrcOptions,
  SettingsData,
  SettingsStore,
} from '@pwm/util';
import { Observable } from 'rxjs';

@Component({
  selector: 'pwm-entry-edit',
  templateUrl: './entry-edit.component.html',
})
export class EntryEditComponent {
  @Input()
  public defaultIconSrc: IconSrcOptions = IconSrcOptions.default;
  @Input()
  public detailEntry: Entry = null;

  @Output()
  public saveEntry = new EventEmitter<Entry>();
  @Output()
  public deleteEntry = new EventEmitter<Entry>();
  @Output()
  public cancelEntry = new EventEmitter<void>();

  public settings$: Observable<SettingsData> = this.settingsStore.getStore();
  public tagOptions$: Observable<string[]> = this.dataStore.getUniqueTagSet();
  public emailOptions$: Observable<string[]> =
    this.dataStore.getUniqueEmailSet();
  public appStore$: Observable<AppData> = this.appStore.getStore();

  constructor(
    private dataStore: DataStoreService,
    private settingsStore: SettingsStore,
    private appStore: AppStore
  ) {}

  public saveEntryClick(entry: any): void {
    // console.log(`saveEntry() -`, entry);
    this.unsavedChangesChange(false);
    this.saveEntry.emit(entry);
  }

  public deleteEntryClick(entry: any): void {
    // console.log(`deleteEntry() -`, entry);
    this.unsavedChangesChange(false);
    this.deleteEntry.emit(entry);
  }

  public cancelEntryClick(): void {
    // console.log(`cancelEntry`);
    this.unsavedChangesChange(false);
    this.cancelEntry.emit();
  }

  public unsavedChangesChange(value: boolean): void {
    // console.log('unsavedChangesChange', value)
    this.appStore.setState({
      ...this.appStore.getState(),
      unsavedChanges: value,
    });
  }
}
