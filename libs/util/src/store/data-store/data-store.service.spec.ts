import {
  Entry,
  FileData,
  MOCK_Entry,
  MOCK_Entry_Array,
  Recovery,
} from '../../models/web';
import { DataStoreService } from './data-store.service';

describe('DataStoreService', () => {
  const service: DataStoreService = new DataStoreService();
  service.setState(MOCK_Entry_Array);

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should contain right data', () => {
    expect(service.getState()).toStrictEqual(MOCK_Entry_Array);
  });

  it('should contain right tags', (done) => {
    const fieldKey: keyof Entry = 'tags';
    const tags: string[] = ['mock-tag', 'mock-tag2', 'mock-tag3'];
    const fileData: FileData = [
      { ...MOCK_Entry, [fieldKey]: [...tags] },
      { ...MOCK_Entry, [fieldKey]: [...tags] },
      { ...MOCK_Entry, [fieldKey]: [tags[0]] },
      { ...MOCK_Entry, [fieldKey]: [tags[0]] },
      { ...MOCK_Entry, [fieldKey]: [tags[1]] },
      { ...MOCK_Entry, [fieldKey]: [tags[2]] },
    ];
    service.setState(fileData);
    service.getUniqueTagSet().subscribe((result) => {
      expect(result).toStrictEqual(tags);
      done();
    });
  }, 1500); // Give 1500ms until it fails

  it('should contain right field string values', (done) => {
    const fieldKey: keyof Entry = 'email';
    const fieldValues: string[] = [
      'mock-account@mock-email.com',
      'mock-account2@mock-email.com',
      'mock-account3@mock-email.com',
    ];
    const fileData: FileData = [
      { ...MOCK_Entry, [fieldKey]: fieldValues[0] },
      { ...MOCK_Entry, [fieldKey]: fieldValues[0] },
      { ...MOCK_Entry, [fieldKey]: fieldValues[1] },
      { ...MOCK_Entry, [fieldKey]: fieldValues[2] },
    ];
    service.setState(fileData);
    service.getUniqueEmailSet().subscribe((result) => {
      expect(result).toStrictEqual(fieldValues);
      done();
    });
  }, 1500); // Give 1500ms until it fails
});
