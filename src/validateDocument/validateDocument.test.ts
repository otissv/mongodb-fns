/* eslint-disable functional/no-expression-statement */
import { validateDocument } from './validateDocument';

describe('validateDocument', () => {
  it('should resolve if document has properties', async () => {
    const props = {
      document: {
        a: 1,
      },
    };
    const actual = await validateDocument(props);

    expect(actual).toEqual(props);
  });

  it('should resolve if document is null or undefined', async () => {
    const actual1 = await validateDocument({ document: null } as any);
    expect(actual1).toEqual({ document: {} });

    const actual2 = await validateDocument({ document: undefined } as any);
    expect(actual2).toEqual({ document: {} });

    const actual3 = await validateDocument({} as any);
    expect(actual3).toEqual({ document: {} });
  });

  it('should reject if document is empty', async () => {
    const actual = validateDocument({
      document: {},
    });
    actual.catch((error: any) => {
      expect(error.message).toEqual('Invalid document provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });

  it('should reject if document is invalid', async () => {
    const actual1 = validateDocument({ document: 1 } as any);
    actual1.catch((error: any) => {
      expect(error.message).toBe('Invalid document provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual2 = validateDocument({ document: 0 } as any);
    actual2.catch((error: any) => {
      expect(error.message).toBe('Invalid document provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual3 = validateDocument({ document: true } as any);
    actual3.catch((error: any) => {
      expect(error.message).toBe('Invalid document provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual6 = validateDocument({ document: [] } as any);
    actual6.catch((error: any) => {
      expect(error.message).toBe('Invalid document provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });
});
