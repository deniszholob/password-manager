import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { typedNullCheck } from '../object/object.util';

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
  public getStore(): Observable<NonNullable<T>> {
    return this.data$.pipe(distinctUntilChanged(), filter(typedNullCheck));
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
