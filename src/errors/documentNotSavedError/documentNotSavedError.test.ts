/* eslint-disable functional/no-expression-statement */
import { documentNotSavedError } from './documentNotSavedError';

describe('documentNotSavedError', () => {
  it('should return document not saved error', () => {
    expect(documentNotSavedError().message).toBe('Document was not saved.');
    expect(documentNotSavedError().code).toBe('DOCUMENT_NOT_SAVED');
  });

  it('should return custom message', () => {
    expect(documentNotSavedError('test').message).toBe('test');
  });
});
