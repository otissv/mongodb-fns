/* eslint-disable functional/no-expression-statement */
import { documentToArray } from './documentToArray';

describe('documentToArray', () => {
  it('should return collection', () => {
    const docs = { a: 1 };

    expect(documentToArray(docs)).toEqual([docs]);
  });
});
