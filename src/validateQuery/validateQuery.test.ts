/* eslint-disable functional/no-expression-statement */
import { validateQuery } from './validateQuery';

describe('validateQuery', () => {
  it('should resolve if query has properties', async () => {
    const props = {
      query: {
        a: 1,
      },
    };
    const actual = await validateQuery(props);

    expect(actual).toEqual(props);
  });

  it('should resolve if query is null or undefined', async () => {
    const actual1 = await validateQuery({ query: null } as any);
    expect(actual1).toEqual({ query: {} });

    const actual2 = await validateQuery({ query: undefined } as any);
    expect(actual2).toEqual({ query: {} });

    const actual3 = await validateQuery({} as any);
    expect(actual3).toEqual({ query: {} });
  });

  it('should reject if query is empty', async () => {
    const actual = validateQuery({
      query: {},
    });
    actual.catch((error: any) => {
      expect(error.message).toEqual('Invalid query provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });

  it('should reject if query is invalid', async () => {
    const actual1 = validateQuery({ query: 1 } as any);
    actual1.catch((error: any) => {
      expect(error.message).toBe('Invalid query provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual2 = validateQuery({ query: 0 } as any);
    actual2.catch((error: any) => {
      expect(error.message).toBe('Invalid query provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual3 = validateQuery({ query: true } as any);
    actual3.catch((error: any) => {
      expect(error.message).toBe('Invalid query provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });

    const actual4 = validateQuery({ query: [] } as any);
    actual4.catch((error: any) => {
      expect(error.message).toBe('Invalid query provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });
});
