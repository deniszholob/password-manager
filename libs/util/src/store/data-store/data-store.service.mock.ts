import { Provider } from '@angular/core';
// import { Observable, of } from 'rxjs';

import { DataStoreService } from './data-store.service';
// import { ExampleReturnType } from './example-return-type.model';
// import { MOCK_ExampleReturnType } from './example-return-type.model.mock';
// export const MOCK_ExampleReturnType: ExampleReturnType = {};

export const MOCK_DataStoreService: Partial<DataStoreService> = {
  // method(): Observable<ExampleReturnType> {
  //  return of(MOCK_ExampleReturnType);
  // },
};

export const MOCK_DataStoreServiceProvider: Provider = {
  provide: DataStoreService,
  useValue: MOCK_DataStoreService,
};
