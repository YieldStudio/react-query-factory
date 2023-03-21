export function deleteEmptyEntries<T extends { [key: string]: unknown }>(obj: T, nullAsEmpty = false): Partial<T> {
  const output = { ...obj } satisfies Partial<T>;

  Object.keys(output).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (output[key] === undefined || (output[key] as any)?.length === 0 || (nullAsEmpty && output[key] === null)) {
      delete output[key];
    }
  });

  return output;
}
