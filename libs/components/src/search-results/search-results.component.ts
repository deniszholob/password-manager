import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entry } from '@pwm/util';

@Component({
  selector: 'pwm-search-results',
  templateUrl: './search-results.component.html',
  // styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input()
  public filteredSearchResults: Entry[] = [];

  @Input()
  public totalResultsCount = 0;

  @Input()
  public disableSelect = false;

  // New Entry
  private _newEntry: Entry | null = null;
  public get newEntry() {
    return this._newEntry;
  }
  @Input()
  public set newEntry(entry: Entry | null) {
    this._newEntry = entry;
    this.selectedEntry = entry;
  }

  // Selected Entry
  private _selectedEntry: Entry | null = null;
  public get selectedEntry() {
    return this._selectedEntry;
  }
  @Input()
  public set selectedEntry(entry: Entry | null) {
    this._selectedEntry = entry;
    this.selectedEntryChange.emit(entry);
  }
  @Output()
  public selectedEntryChange = new EventEmitter<Entry>();

  // ======================================================================== //

  public sortDown = true;

  public changeSort() {
    // console.log('changeSort()');
    this.sortDown = !this.sortDown;
    this.sortResults();
  }

  public sortResults() {
    // console.log('sortResults()');
    this.filteredSearchResults.sort((a, b) => {
      return this.sortDown
        ? a.serviceName.localeCompare(b.serviceName)
        : b.serviceName.localeCompare(a.serviceName);
    });
  }
}
