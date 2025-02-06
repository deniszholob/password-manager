import { BehaviorSubject, Observable } from 'rxjs';

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
