/* eslint-disable functional/no-expression-statement */
import { validateDatabase } from './validateDatabase';

describe('validateDatabase', () => {
  it('should resolve if database has properties', async () => {
    const props = {
      database: {
        a: 1,
      },
    };
    const actual = await validateDatabase(props);

    expect(actual).toEqual(props);
  });

  it('should reject if database is empty', async () => {
    validateDatabase({
      database: {},
    }).catch((error: any) => {
      expect(error.message).toEqual('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });

  it('should reject if database is invalid', async () => {
    validateDatabase({
      database: {},
    }).catch((error: any) => {
      expect(error.message).toEqual('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });

    validateDatabase({ collectionName: 1 } as any).catch((error: any) => {
      expect(error.message).toBe('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    validateDatabase({ collectionName: 0 } as any).catch((error: any) => {
      expect(error.message).toBe('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    validateDatabase({ collectionName: true } as any).catch((error: any) => {
      expect(error.message).toBe('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    validateDatabase({ collectionName: null } as any).catch((error: any) => {
      expect(error.message).toBe('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    validateDatabase({ collectionName: undefined } as any).catch(
      (error: any) => {
        expect(error.message).toBe('No database instance provided.');
        expect(error.code).toEqual('BAD_REQUEST');
      },
    );
    validateDatabase({ collectionName: [] } as any).catch((error: any) => {
      expect(error.message).toBe('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    validateDatabase({} as any).catch((error: any) => {
      expect(error.message).toBe('No database instance provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });
});
