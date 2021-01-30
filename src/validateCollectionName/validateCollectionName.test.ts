/* eslint-disable functional/no-expression-statement */
import { validateCollectionName } from './validateCollectionName';

describe('validateCollectionName', () => {
  it('should return object with collection name', async () => {
    const actual: any = await validateCollectionName({
      collectionName: 'MyCollectionName',
    });

    expect(actual.collectionName).toBe('MyCollectionName');
  });

  it('should return error if collection name is empty string', async () => {
    validateCollectionName({ collectionName: '' }).catch((error: any) => {
      expect(error.message).toBe('Must provide a collection name.');
    });
    validateCollectionName({ collectionName: '' }).catch((error: any) => {
      expect(error.code).toBe('BAD_REQUEST');
    });
  });

  it('should return error if collection name is not string', async () => {
    validateCollectionName({ collectionName: 1 } as any).catch((error: any) => {
      expect(error.message).toBe('Must provide a collection name.');
      expect(error.code).toBe('BAD_REQUEST');
    });
    validateCollectionName({ collectionName: 0 } as any).catch((error: any) => {
      expect(error.message).toBe('Must provide a collection name.');
      expect(error.code).toBe('BAD_REQUEST');
    });
    validateCollectionName({ collectionName: true } as any).catch(
      (error: any) => {
        expect(error.message).toBe('Must provide a collection name.');
        expect(error.code).toBe('BAD_REQUEST');
      },
    );
    validateCollectionName({ collectionName: null } as any).catch(
      (error: any) => {
        expect(error.message).toBe('Must provide a collection name.');
        expect(error.code).toBe('BAD_REQUEST');
      },
    );
    validateCollectionName({ collectionName: undefined } as any).catch(
      (error: any) => {
        expect(error.message).toBe('Must provide a collection name.');
        expect(error.code).toBe('BAD_REQUEST');
      },
    );
    validateCollectionName({ collectionName: [] } as any).catch(
      (error: any) => {
        expect(error.message).toBe('Must provide a collection name.');
        expect(error.code).toBe('BAD_REQUEST');
      },
    );
    validateCollectionName({} as any).catch((error: any) => {
      expect(error.message).toBe('Must provide a collection name.');
      expect(error.code).toBe('BAD_REQUEST');
    });
  });
});
