// Object utilities

/**
 * @usage .filter(typedNullCheck)
 * @returns true if obj is not null or undefined
 */
export function typedNullCheck<T>(obj: T): obj is NonNullable<T> {
  return obj != null;
}

// export function getCombinedUniqueFieldValuesFromObject<T, K extends keyof T>(
//   objects: T[],
//   fieldKey: K
// ): T[K][] {
//   return getUniqueValues(
//     // objects.flatMap((o: T): T[K] => {
//     //   const value: T[K] = getFieldValueFromObject<T, K>(o, fieldKey);
//     //   if (Array.isArray(value)) return value;
//     //   return [value] as unknown as T[K];
//     // })
//     getCombinedFieldValuesFromObject<T, K>(objects, fieldKey)
//   );
// }

export function getCombinedFieldValuesFromObject<T, K extends keyof T>(
  objects: T[],
  fieldKey: K
): T[K][] {
  return objects
    .map((o: T): T[K] => getFieldValueFromObject<T, K>(o, fieldKey))
    .filter(typedNullCheck);
}

export function getFieldValueFromObject<T, K extends keyof T>(
  entry: T,
  fieldKey: K
): T[K] {
  return entry[fieldKey];
}

export function getUniqueValues<T>(inputValues: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  // if to accept inputValues: T[] | T[][]
  // const values = values.flatMap((v) => (Array.isArray(v) ? v : [v]));
  const values: T[] = inputValues;
  for (const value of values) {
    const setId: string =
      typeof value === 'object' ? JSON.stringify(value) : String(value);
    if (!seen.has(setId)) {
      seen.add(setId);
      result.push(value);
    }
  }
  return result;
}
