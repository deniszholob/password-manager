import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Entry, FileData, SettingsData } from '../models/web';

// AKA "Model" or "State" or "Store"
export class Store<T> {
  // Observable source
  private _data: BehaviorSubject<T>;
  private data$: Observable<T>;

  constructor(initialData: Partial<T>) {
    // Create Observable stream
    this._data = new BehaviorSubject<T>(initialData as T);
    this.data$ = this._data.asObservable();
  }

  /** select */
  public getStore(): Observable<T> {
    return this.data$;
  }

  /** selectSnapshot */
  public getState(): T {
    return this._data.getValue();
  }

  public setState(d: T) {
    this._data.next(d);
  }

  // public patchState(d: Partial<T>) {
  //   const currentState = this.getState();
  //   this.setState({
  //     ...currentState,
  //     ...d,
  //   });
  // }
}

@Injectable({ providedIn: 'root' })
export class DataStore extends Store<FileData | null> {
  constructor() {
    // console.log(`DataStore Init`)
    super(null);
  }

  public getUniqueTagSet(): Observable<string[]> {
    return this.getStore().pipe(
      filter((f) => f != null),
      // Convert FileData to array of unique tags
      map((f: FileData) =>
        f
          // Convert Entry to Tag array
          .map((e: Entry) => e.tags)
          // Merge each of the tag arrays from the entries into one containing unique tags
          .reduce((prev: string[], curr: string[]) => {
            if (!curr) return prev;
            // For each tag set...
            curr.forEach((v) => {
              // Only add a tag if it doesn't already exist
              if (prev.indexOf(v) === -1) {
                prev.push(v);
              }
            });
            return prev;
          }, [])
      )
      // tap((v) => console.log(`getUniqueTagSet() -`, v))
    );
  }
}

@Injectable({ providedIn: 'root' })
export class SettingsStore extends Store<SettingsData | null> {
  constructor() {
    // console.log(`SettingsStore Init`)
    super(null);
  }
}

@Injectable({ providedIn: 'root' })
export class AppStore extends Store<AppData | null> {
  constructor() {
    // console.log(`SettingsStore Init`)
    super(null);
  }
}

export interface AppData {
  unsavedChanges: boolean;
}
