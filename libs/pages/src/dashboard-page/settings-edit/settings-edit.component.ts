import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  SettingsData,
  SettingsStore,
  DataService,
  FileDisplay,
} from '@pwm/util';

@Component({
  selector: 'pwm-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss'],
})
export class SettingsEditComponent {
  @Input()
  public disableFileSelection = false;

  @Output()
  public closeSettings = new EventEmitter();

  public settingsFileDisplay: FileDisplay =
    this.dataService.getSettingsFileDisplay();
  public settings$ = this.settingsStore.getStore();
  public error: string | null = null;
  public loading: string | null = null;

  constructor(
    private dataService: DataService,
    private settingsStore: SettingsStore
  ) {}

  public closeSettingsClick(): void {
    this.closeSettings.emit();
  }

  public onShowItemInExplorer(path: string): void {
    this.error = this.dataService.onShowItemInExplorer(path);
  }

  public saveSettings(settings: SettingsData | null): void {
    if (!settings) throw new Error('Settings is null');

    // console.log(`saveSettings -`, settings);
    this.loading = 'Saving Settings...';
    this.error = null;

    // Save to file
    this.dataService.saveSettings(settings).subscribe(
      () => {
        // console.log('saveDetailEntry() saveData() success');
        this.loading = null;
        // // Clear new entry now that its saved
        // if (this.detailEntry === this.newEntry) {
        //   this.newEntry = null;
        // }
      },
      (err) => {
        // console.error(`saveDetailEntry() saveData() fail - `, err);
        this.loading = null;
        // Rollback add to array
        // if (this.newEntry && this.detailEntry === this.newEntry) {
        //   this.fileData.pop();
        // }
        this.error = err;
      }
    );
  }
}
