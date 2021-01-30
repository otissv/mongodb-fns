/* eslint-disable functional/no-expression-statement */
import { documentExistsError } from './documentExistsError';

describe('documentExistsError', () => {
  it('should return document exits error', () => {
    expect(documentExistsError().message).toBe('Document Exists.');
    expect(documentExistsError().code).toBe('DOCUMENTS_EXISTS');
  });

  it('should return custom message', () => {
    expect(documentExistsError('test').message).toBe('test');
  });
});
