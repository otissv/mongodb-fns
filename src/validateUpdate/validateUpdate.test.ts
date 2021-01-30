/* eslint-disable functional/no-expression-statement */
import { validateUpdate } from './validateUpdate';

describe('validateUpdate', () => {
  it('should resolve if update has properties', async () => {
    const props = {
      update: {
        a: 1,
      },
    };
    const actual = await validateUpdate(props);

    expect(actual).toEqual(props);
  });

  it('should reject if update is empty', async () => {
    const actual = validateUpdate({
      update: {},
    });
    actual.catch((error: any) => {
      expect(error.message).toEqual('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });

  it('should reject if update is invalid', async () => {
    const actual1 = validateUpdate({ update: 1 } as any);
    actual1.catch((error: any) => {
      expect(error.message).toBe('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual2 = validateUpdate({ update: 0 } as any);
    actual2.catch((error: any) => {
      expect(error.message).toBe('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual3 = validateUpdate({ update: true } as any);
    actual3.catch((error: any) => {
      expect(error.message).toBe('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual4 = validateUpdate({ update: null } as any);
    actual4.catch((error: any) => {
      expect(error.message).toBe('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual5 = validateUpdate({ update: undefined } as any);
    actual5.catch((error: any) => {
      expect(error.message).toBe('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual6 = validateUpdate({ update: [] } as any);
    actual6.catch((error: any) => {
      expect(error.message).toBe('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual7 = validateUpdate({} as any);
    actual7.catch((error: any) => {
      expect(error.message).toBe('Invalid update provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });
});
