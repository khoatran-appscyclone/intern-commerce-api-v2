// @ts-nocheck
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
      return result;
    },
    {} as Pick<T, K>,
  );
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj } as Omit<T, K>;
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}
