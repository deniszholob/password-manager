import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SettingsData, SettingsStore, DataService } from '@pwm/util';

@Component({
  selector: 'pwm-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss'],
})
export class SettingsEditComponent {
  public settings$ = this.settingsStore.getStore();

  public error: string | null = null;
  public loading: string | null = null;

  @Output()
  public closeSettings = new EventEmitter();

  @Input()
  public disableFileSelection = false;

  constructor(
    private dataService: DataService,
    private settingsStore: SettingsStore
  ) {}

  public closeSettingsClick() {
    this.closeSettings.emit();
  }

  public saveSettings(settings: SettingsData): void {
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
