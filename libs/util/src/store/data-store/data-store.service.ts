import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  share,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { FileData, Entry } from '../../models/web';
import { Store } from '../store.class';
import {
  getCombinedFieldValuesFromObject,
  getUniqueValues,
  typedNullCheck,
} from '../../object/object.util';

@Injectable({ providedIn: 'root' })
export class DataStoreService extends Store<FileData | null> {
  constructor() {
    // console.log(`DataStore Init`)
    super(null);
  }

  private fileData$: Observable<FileData> = this.getStore().pipe(
    // share(),
    filter(typedNullCheck)
  );

  private getFieldValuesFromData<K extends keyof Entry>(
    fieldKey: K
  ): Observable<Entry[K][]> {
    return this.fileData$.pipe(
      distinctUntilChanged(),
      map((entries: Entry[]): Entry[K][] =>
        getCombinedFieldValuesFromObject(entries, fieldKey)
      )
      // shareReplay(),
      // tap((v) => console.log(`getFieldValuesFromData() -`, v))
    );
  }

  // private getUniqueFieldValuesFromData<K extends keyof Entry>(
  //   fieldKey: K
  // ): Observable<Entry[K][]> {
  //   return this.fileData$.pipe(
  //     map((entries: Entry[]): Entry[K][] =>
  //       getCombinedUniqueFieldValuesFromObject(entries, fieldKey)
  //     )
  //   );
  // }

  public getUniqueTagSet(): Observable<string[]> {
    return this.getFieldValuesFromData('tags').pipe(
      map((tags: (string[] | undefined)[]): string[] =>
        getUniqueValues(tags.flat()).filter(typedNullCheck)
      )
      // shareReplay(),
      // tap((v) => console.log(`getUniqueTagSet() -`, v))
    );
  }

  public getUniqueEmailSet(): Observable<string[]> {
    return this.getFieldValuesFromData('email').pipe(
      map((emails: (string | undefined)[]): string[] =>
        getUniqueValues(emails).filter(typedNullCheck)
      )
      // shareReplay(),
      // tap((v) => console.log(`getUniqueEmailSet() -`, v))
    );
  }

  // private getUniqueTagSet_OLD(): Observable<string[]> {
  //   return this.fileData$.pipe(
  //     // Convert FileData to array of unique tags
  //     map((f: FileData): string[] =>
  //       f
  //         // Convert Entry to Tag array
  //         .map((e: Entry): string[] => e.tags)
  //         // Merge each of the tag arrays from the entries into one containing unique tags
  //         .reduce((prev: string[], curr: string[]): string[] => {
  //           if (!curr) return prev;
  //           // For each tag set...
  //           curr.forEach((v: string): void => {
  //             // Only add a tag if it doesn't already exist
  //             if (prev.indexOf(v) === -1) {
  //               prev.push(v);
  //             }
  //           });
  //           return prev;
  //         }, [])
  //     )
  //     // tap((v) => console.log(`getUniqueTagSet() -`, v))
  //   );
  // }
}
