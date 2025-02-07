import {
  // getCombinedUniqueFieldValuesFromObject,
  getCombinedFieldValuesFromObject,
  getFieldValueFromObject,
  getUniqueValues,
} from './object.util';

describe('Object Utilities', () => {
  interface TestObject {
    id: number;
    name: string;
    tags: string[];
    details: { age: number; role: string };
  }

  const testObjects: TestObject[] = [
    {
      id: 1,
      name: 'Alice',
      tags: ['a', 'b'],
      details: { age: 25, role: 'dev' },
    },
    {
      id: 2,
      name: 'Bob',
      tags: ['b', 'c'],
      details: { age: 30, role: 'manager' },
    },
    {
      id: 1,
      name: 'Alice',
      tags: ['a', 'b'],
      details: { age: 25, role: 'dev' },
    }, // Duplicate
  ];

  // describe('getCombinedUniqueFieldValuesFromObject', () => {
  //   test('returns unique primitives', () => {
  //     expect(
  //       getCombinedUniqueFieldValuesFromObject(testObjects, 'name')
  //     ).toEqual(['Alice', 'Bob']);
  //   });

  //   test('returns unique flattened arrays', () => {
  //     expect(
  //       getCombinedUniqueFieldValuesFromObject(testObjects, 'tags')
  //     ).toEqual(['a', 'b', 'c']);
  //   });

  //   test('returns unique details objects', () => {
  //     expect(
  //       getCombinedUniqueFieldValuesFromObject(testObjects, 'details')
  //     ).toEqual([
  //       { age: 25, role: 'dev' },
  //       { age: 30, role: 'manager' },
  //     ]);
  //   });
  // });

  describe('getCombinedFieldValuesFromObject', () => {
    test('collects all values for primitives', () => {
      expect(getCombinedFieldValuesFromObject(testObjects, 'name')).toEqual([
        'Alice',
        'Bob',
        'Alice',
      ]);
    });

    test('collects all values for arrays', () => {
      expect(getCombinedFieldValuesFromObject(testObjects, 'tags')).toEqual([
        ['a', 'b'],
        ['b', 'c'],
        ['a', 'b'],
      ]);
    });

    test('collects all values for objects', () => {
      expect(getCombinedFieldValuesFromObject(testObjects, 'details')).toEqual([
        { age: 25, role: 'dev' },
        { age: 30, role: 'manager' },
        { age: 25, role: 'dev' },
      ]);
    });
  });

  describe('getFieldValueFromObject', () => {
    test('returns correct name field string value', () => {
      expect(
        getFieldValueFromObject(testObjects[0] as TestObject, 'name')
      ).toBe('Alice');
    });

    test('returns correct id field number value', () => {
      expect(getFieldValueFromObject(testObjects[1] as TestObject, 'id')).toBe(
        2
      );
    });

    test('returns correct tags field array value', () => {
      expect(
        getFieldValueFromObject(testObjects[2] as TestObject, 'tags')
      ).toEqual(['a', 'b']);
    });

    test('returns correct details field object value', () => {
      expect(
        getFieldValueFromObject(testObjects[2] as TestObject, 'details')
      ).toEqual({
        age: 25,
        role: 'dev',
      });
    });
  });

  describe('getUniqueValues', () => {
    test('removes duplicate strings', () => {
      expect(getUniqueValues(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    test('removes duplicate numbers', () => {
      expect(getUniqueValues([1, 2, 2, 3])).toEqual([1, 2, 3]);
    });

    test('removes duplicate arrays', () => {
      expect(
        getUniqueValues([
          ['a', 'b'],
          ['a', 'b'],
          ['b', 'c'],
        ])
      ).toEqual([
        ['a', 'b'],
        ['b', 'c'],
      ]);
    });

    test('removes duplicate objects', () => {
      expect(getUniqueValues([{ a: 1 }, { a: 1 }, { b: 2 }])).toEqual([
        { a: 1 },
        { b: 2 },
      ]);
    });
  });
});
