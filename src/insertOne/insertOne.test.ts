/* eslint-disable functional/no-expression-statement */

import { insertOne } from './insertOne';
import { BAD_REQUEST } from '../errors/codes.error';
describe('insertOne', () => {
  const database = (doc: Record<string, any>) => ({
    collection: jest.fn().mockReturnThis(),
    insertOne: jest.fn().mockReturnValue(doc),
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return a document', async () => {
    const doc = {
      _id: '5fc5fd5163575f00b6e73ba6',
      host: 'https://pbid.io',
      shortUrlId: '27vm0c8s4',
      url: 'www.google.com',
    };

    const actual = await insertOne({
      database: database(doc),
      collectionName: 'collectionName',
      document: doc,
    });

    expect(actual).toEqual([doc]);
  });

  it('should return document exists error', async () => {
    const doc = {
      _id: '5fc5fd5163575f00b6e73ba6',
      host: 'https://pbid.io',
      shortUrlId: '27vm0c8s4',
      url: 'www.google.com',
    };

    const actual: any = insertOne({
      database: {
        collection: jest.fn().mockReturnThis(),
        insertOne: () => {
          const error: any = new Error('');
          // eslint-disable-next-line functional/immutable-data
          error.code = 11000;
          // eslint-disable-next-line functional/no-throw-statement
          throw error;
        },
      },
      collectionName: 'collectionName',
      document: doc,
    });

    actual.catch((error: any) => {
      expect(error.message).toBe('Document Exists.');
      expect(error.code).toBe('DOCUMENTS_EXISTS');
    });
  });

  it('should return an error if invalid collectionName', async () => {
    const doc = {
      _id: '5fc5fd5163575f00b6e73ba6',
      host: 'https://pbid.io',
      shortUrlId: '27vm0c8s4',
      url: 'www.google.com',
    };

    const defaults: any = {
      database: database(doc),
    };

    expect(await insertOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await insertOne(defaults).catch((error: any) => error instanceof Error),
    ).toBe(true);
    expect(await insertOne(defaults).catch((error: any) => error.message)).toBe(
      'Must provide a collection name.',
    );
    expect(await insertOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
    expect(
      await insertOne({ ...defaults, collectionName: '' }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await insertOne({ ...defaults, collectionName: null }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await insertOne({ ...defaults, collectionName: 1 }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await insertOne({ ...defaults, collectionName: true }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
  });

  it('should return an error if invalid database', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
    };

    expect(await insertOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await insertOne(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await insertOne(defaults).catch((error: any) => error.message)).toBe(
      'No database instance provided.',
    );
    expect(await insertOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });

  it('should return an error if invalid document', async () => {
    const defaults = {
      database: {
        collection: jest.fn().mockReturnThis(),
        insertOne: jest.fn().mockReturnThis(),
      },
      collectionName: 'collectionName',
      document: {},
    };

    expect(await insertOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await insertOne(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await insertOne(defaults).catch((error: any) => error.message)).toBe(
      'Invalid document provided.',
    );
    expect(await insertOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });

  it('should return error if document was not inserted', async () => {
    const actual = insertOne({
      database: {
        collection: jest.fn().mockReturnThis(),
        insertOne: jest.fn().mockReturnValue({
          insertedCount: 0,
          n: 0,
        }),
      },
      collectionName: 'collectionName',
      document: {
        _id: '5fc5fd5163575f00b6e73ba6',
      },
    });

    actual.catch((error: any) => {
      expect(error.message).toBe('Document was not saved.');
      expect(error.code).toBe('DOCUMENT_NOT_SAVED');
    });
  });
});
