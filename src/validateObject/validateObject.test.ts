/* eslint-disable functional/no-expression-statement */
import { validateObject } from './validateObject';

describe('validateObject', () => {
  it('should resolve if field has properties', async () => {
    const props = {
      field: {
        a: 1,
      },
    };
    const actual = await validateObject('field')(props);

    expect(actual).toEqual(props);
  });

  it('should reject if field is empty', async () => {
    const actual = validateObject('field')({
      field: {},
    });
    actual.catch((error: any) => {
      expect(error.message).toEqual('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });

  it('should reject if field is invalid', async () => {
    const actual1 = validateObject('field')({ field: 1 } as any);
    actual1.catch((error: any) => {
      expect(error.message).toBe('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual2 = validateObject('field')({ field: 0 } as any);
    actual2.catch((error: any) => {
      expect(error.message).toBe('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual3 = validateObject('field')({ field: true } as any);
    actual3.catch((error: any) => {
      expect(error.message).toBe('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual4 = validateObject('field')({ field: null } as any);
    actual4.catch((error: any) => {
      expect(error.message).toBe('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual5 = validateObject('field')({ field: undefined } as any);
    actual5.catch((error: any) => {
      expect(error.message).toBe('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual6 = validateObject('field')({ field: [] } as any);
    actual6.catch((error: any) => {
      expect(error.message).toBe('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
    const actual7 = validateObject('field')({} as any);
    actual7.catch((error: any) => {
      expect(error.message).toBe('Invalid field provided.');
      expect(error.code).toEqual('BAD_REQUEST');
    });
  });
});
