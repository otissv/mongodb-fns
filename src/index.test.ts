/* eslint-disable functional/no-expression-statement */
import { add1 } from './index';

describe('add1', () => {
  it('should add 1 to number', () => {
    expect(add1(2)).toBe(3);
  });
});
