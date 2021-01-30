/* eslint-disable functional/no-expression-statement */
import { objectHasProps } from './objectHasProps';

describe('objectHasProps', () => {
  it('should return true if object has properties', () => {
    expect(objectHasProps({ a: 1 })).toBe(true);
    expect(objectHasProps([1])).toBe(true);
  });
  it('should return false if object has no properties', () => {
    expect(objectHasProps({})).toBe(false);
    expect(objectHasProps([])).toBe(false);
  });

  it('should return false if not an object', () => {
    expect(objectHasProps(1 as any)).toBe(false);
    expect(objectHasProps(0 as any)).toBe(false);
    expect(objectHasProps(true as any)).toBe(false);
    expect(objectHasProps(false as any)).toBe(false);
    expect(objectHasProps(null as any)).toBe(false);
    expect(objectHasProps(undefined as any)).toBe(false);
    expect(objectHasProps('' as any)).toBe(false);
    expect(objectHasProps('a' as any)).toBe(false);
  });
});
