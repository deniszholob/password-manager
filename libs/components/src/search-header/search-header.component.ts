import { Component, EventEmitter, Input, Output } from '@angular/core';

export type FieldCheckOptions =
  | 'No Service Name'
  | 'No URL'
  | 'No Email'
  | 'No Username'
  | 'No Password';

@Component({
  selector: 'pwm-search-header',
  templateUrl: './search-header.component.html',
  // styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent {
  @Input()
  public name?: string;

  @Input()
  public disabledSearch = false;
  @Input()
  public disabledCreateNew = false;

  @Output()
  public clearSearch = new EventEmitter<Event>();
  @Output()
  public createNewEntry = new EventEmitter<Event>();

  @Input()
  public searchQuery = '';
  @Output()
  public searchQueryChange = new EventEmitter<string>();

  @Output()
  public openSettings = new EventEmitter();

  @Input()
  public tags: string[] = [];

  @Output()
  public filterTagsChange = new EventEmitter<string[]>();
  public filterTags: string[] = [];

  @Output()
  public filterFieldChecksChange = new EventEmitter<FieldCheckOptions>();
  public fieldCheckOptions: FieldCheckOptions[] = [
    'No Service Name',
    'No URL',
    'No Email',
    'No Username',
    'No Password',
  ];
  public fieldChecks: string | null = null;

  public openSettingsClick() {
    this.openSettings.emit();
  }

  public clearSearchClick(event: Event) {
    this.clearSearch.next(event);
  }

  public createNewEntryClick(event: Event) {
    this.createNewEntry.next(event);
  }

  public searchChange(newValue: string) {
    // console.log(`searchChange() -`, newValue);
    this.searchQuery = newValue;
    this.searchQueryChange.emit(newValue);
  }

  public tagsChange(newValue: string[]) {
    // console.log(`tagsChange() -`, newValue);
    this.filterTags = newValue;
    this.filterTagsChange.emit(newValue);
  }

  public fieldChecksChange(newValue: FieldCheckOptions) {
    this.filterFieldChecksChange.emit(newValue);
  }
}
