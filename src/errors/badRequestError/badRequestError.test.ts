/* eslint-disable functional/no-expression-statement */
import { badRequestError } from './badRequestError';

describe('badRequestError', () => {
  it('should return bad request error message', () => {
    expect(badRequestError().message).toBe('Bad Request.');
    expect(badRequestError().code).toBe('BAD_REQUEST');
  });
});
