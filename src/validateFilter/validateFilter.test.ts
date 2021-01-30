/* eslint-disable functional/no-expression-statement */
import { validateFilter } from './validateFilter';

describe('validateFilter', () => {
  it('should resolve if filter has properties', async () => {
    const props = {
      filter: {
        a: 1,
      },
    };
    const actual = await validateFilter(props);

    expect(actual).toEqual(props);
  });

  it('should resolve if filter is null or undefined', async () => {
    const actual1 = await validateFilter({ filter: null } as any);
    expect(actual1).toEqual({ filter: {} });

    const actual2 = await validateFilter({ filter: undefined } as any);
    expect(actual2).toEqual({ filter: {} });

    const actual3 = await validateFilter({} as any);
    expect(actual3).toEqual({ filter: {} });
  });

  it('should reject if filter is empty', async () => {
    const actual = validateFilter({
      filter: {},
    });
    actual.catch((error: any) => {
      expect(error.message).toEqual('Invalid filter provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });

  it('should reject if filter is invalid', async () => {
    const actual1 = validateFilter({ filter: 1 } as any);
    actual1.catch((error: any) => {
      expect(error.message).toBe('Invalid filter provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual2 = validateFilter({ filter: 0 } as any);
    actual2.catch((error: any) => {
      expect(error.message).toBe('Invalid filter provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual3 = validateFilter({ filter: true } as any);
    actual3.catch((error: any) => {
      expect(error.message).toBe('Invalid filter provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual6 = validateFilter({ filter: [] } as any);
    actual6.catch((error: any) => {
      expect(error.message).toBe('Invalid filter provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });
});
