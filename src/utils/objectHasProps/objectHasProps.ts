export function objectHasProps(value: {
  readonly [key: string]: any;
}): boolean {
  const notObject =
    value == null ||
    typeof value !== 'object' ||
    Object.keys(value).length === 0;

  return notObject ? false : true;
}
