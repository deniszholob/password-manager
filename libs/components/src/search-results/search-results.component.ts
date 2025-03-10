import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Entry } from '@pwm/util';

@Component({
  selector: 'pwm-search-results',
  templateUrl: './search-results.component.html',
  host: {
    class: 'outline-none',
    tabindex: '0',
  },
})
export class SearchResultsComponent {
  public readonly resultsEntryId: string = 'results-entry-';
  @Input()
  public filteredSearchResults: Entry[] = [];

  @Input()
  public totalResultsCount: number = 0;

  @Input()
  public disableSelect: boolean = false;

  @Input()
  public isListFocused: boolean = false;

  // New Entry
  private _newEntry: Entry | null = null;
  public get newEntry(): Entry | null {
    return this._newEntry;
  }
  @Input()
  public set newEntry(entry: Entry | null) {
    this._newEntry = entry;
    this.selectedEntry = entry;
  }

  // Selected Entry
  private _selectedEntry: Entry | null = null;
  public get selectedEntry(): Entry | null {
    return this._selectedEntry;
  }
  @Input()
  public set selectedEntry(entry: Entry | null) {
    this._selectedEntry = entry;
    this.selectedEntryChange.emit(entry);
  }
  @Output()
  public selectedEntryChange: EventEmitter<Entry | null> =
    new EventEmitter<Entry | null>();

  public sortDown: boolean = true;
  private currentIndex: number = -1; // Index of the currently selected entry

  // ======================================================================== //

  @ViewChild('searchResultsList')
  public searchResultsList: ElementRef | undefined; // Reference to the scrollable list

  // Listen for the list being focused
  @HostListener('focus', ['$event'])
  protected onListFocusIn(event: FocusEvent): void {
    // console.log('onListFocusIn()');
    this.onListFocus(true);
  }

  // Listen for the root element losing focus
  @HostListener('blur', ['$event'])
  protected onRootBlur(): void {
    // console.log('onRootBlur()');
    this.onListFocus(false);
  }

  public onListFocus(focused: boolean): void {
    // console.log('onListFocus()', focused);
    this.isListFocused = focused;
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent): void {
    if (!this.selectedEntry || this.disableSelect) return;
    if (event.key === 'Escape') {
      return this.handleEscape();
    }

    if (!this.isListFocused) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      return this.navigateDown();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      return this.navigateUp();
    }
  }

  private navigateDown(): void {
    if (this.currentIndex >= this.filteredSearchResults.length - 1) return;

    this.currentIndex++;
    const entryToSelect = this.filteredSearchResults[this.currentIndex];
    if (!entryToSelect) return;

    this.selectedEntry = entryToSelect;
    this.scrollToSelected();
  }

  private navigateUp(): void {
    if (this.currentIndex <= 0) return;

    this.currentIndex--;
    const entryToSelect = this.filteredSearchResults[this.currentIndex];
    if (!entryToSelect) return;

    this.selectedEntry = entryToSelect;
    this.scrollToSelected();
  }

  private handleEscape(): void {
    this.selectedEntry = null;
    this.currentIndex = -1;
  }

  public onSelectedItem(item: Entry, index: number): void {
    if (this.disableSelect) return;
    this.selectedEntry = item;
    this.currentIndex = index;
  }

  // Scroll the selected entry into view
  private scrollToSelected(): void {
    if (!this.selectedEntry || !this.searchResultsList) return;

    const selectedElement: HTMLElement | null = document.getElementById(
      `${this.resultsEntryId}${this.currentIndex}`
    );
    if (!selectedElement) return;

    selectedElement.scrollIntoView({
      behavior: 'auto', // Optional smooth scroll effect
      block: 'nearest', // Align the selected element in the center of the viewport
    });
  }

  public changeSort(): void {
    // console.log('changeSort()');
    this.sortDown = !this.sortDown;
    this.sortResults();
  }

  public sortResults(): void {
    // console.log('sortResults()');
    this.filteredSearchResults.sort((a: Entry, b: Entry): number => {
      return this.sortDown
        ? a.serviceName.localeCompare(b.serviceName)
        : b.serviceName.localeCompare(a.serviceName);
    });
  }
}
