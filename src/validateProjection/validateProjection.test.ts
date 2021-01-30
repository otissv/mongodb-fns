/* eslint-disable functional/no-expression-statement */
import { validateProjection } from './validateProjection';

describe('validateProjection', () => {
  it('should resolve if projection has properties', async () => {
    const props = {
      projection: {
        a: 1,
      },
    };
    const actual = await validateProjection(props);

    expect(actual).toEqual(props);
  });

  it('should resolve if projection is null or undefined', async () => {
    const actual1 = await validateProjection({ projection: null } as any);
    expect(actual1).toEqual({ projection: {} });

    const actual2 = await validateProjection({ projection: undefined } as any);
    expect(actual2).toEqual({ projection: {} });

    const actual3 = await validateProjection({} as any);
    expect(actual3).toEqual({ projection: {} });
  });

  it('should reject if projection is empty', async () => {
    const actual = validateProjection({
      projection: {},
    });
    actual.catch((error: any) => {
      expect(error.message).toEqual('Invalid projection provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });

  it('should reject if projection is empty', async () => {
    const actual1 = validateProjection({ projection: 1 } as any);
    actual1.catch((error: any) => {
      expect(error.message).toBe('Invalid projection provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual2 = validateProjection({ projection: 0 } as any);
    actual2.catch((error: any) => {
      expect(error.message).toBe('Invalid projection provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual3 = validateProjection({ projection: true } as any);
    actual3.catch((error: any) => {
      expect(error.message).toBe('Invalid projection provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });

    const actual6 = validateProjection({ projection: [] } as any);
    actual6.catch((error: any) => {
      expect(error.message).toBe('Invalid projection provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });
});
