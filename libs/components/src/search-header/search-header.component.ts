import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

export type FieldCheckOptions =
  | 'No Service Name'
  | 'No URL'
  | 'No Email'
  | 'No Username'
  | 'No Password';

@Component({
  selector: 'pwm-search-header',
  templateUrl: './search-header.component.html',
})
export class SearchHeaderComponent implements AfterViewInit {
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

  @ViewChild('searchInput')
  private searchInput?: ElementRef<HTMLInputElement>;

  /** Called after ngAfterContentInit when the component's view has been initialized. Applies to components only. */
  public ngAfterViewInit(): void {
    this.focusSearchInput();
  }

  public focusSearchInput(): void {
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    }, 0);
  }

  public openSettingsClick(): void {
    this.openSettings.emit();
  }

  public clearSearchClick(event: Event): void {
    if (this.disabledSearch) return;
    this.clearSearch.next(event);
  }

  public createNewEntryClick(event: Event): void {
    if (this.disabledCreateNew) return;
    this.createNewEntry.next(event);
  }

  public searchChange(newValue: string): void {
    if (this.disabledSearch) return;
    // console.log(`searchChange() -`, newValue);
    this.searchQuery = newValue;
    this.searchQueryChange.emit(newValue);
  }

  public tagsChange(newValue: string[]): void {
    if (this.disabledSearch) return;
    // console.log(`tagsChange() -`, newValue);
    this.filterTags = newValue;
    this.filterTagsChange.emit(newValue);
  }

  public fieldChecksChange(newValue: FieldCheckOptions): void {
    if (this.disabledSearch) return;
    this.filterFieldChecksChange.emit(newValue);
  }
}
