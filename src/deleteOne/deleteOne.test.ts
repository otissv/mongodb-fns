/* eslint-disable functional/no-expression-statement */

import { deleteOne } from './deleteOne';
import { BAD_REQUEST } from '../errors/codes.error';
describe('deleteOne', () => {
  const database = (doc: Record<string, any>) => ({
    collection: jest.fn().mockReturnThis(),
    deleteOne: jest.fn().mockReturnValue(doc),
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

    const actual = await deleteOne({
      database: database(doc),
      collectionName: 'collectionName',
      filter: { _id: doc._id },
    });

    expect(actual).toEqual([doc]);
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

    expect(await deleteOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await deleteOne(defaults).catch((error: any) => error instanceof Error),
    ).toBe(true);
    expect(await deleteOne(defaults).catch((error: any) => error.message)).toBe(
      'Must provide a collection name.',
    );
    expect(await deleteOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
    expect(
      await deleteOne({ ...defaults, collectionName: '' }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await deleteOne({ ...defaults, collectionName: null }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await deleteOne({ ...defaults, collectionName: 1 }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await deleteOne({ ...defaults, collectionName: true }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
  });

  it('should return an error if invalid database', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
    };

    expect(await deleteOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await deleteOne(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await deleteOne(defaults).catch((error: any) => error.message)).toBe(
      'No database instance provided.',
    );
    expect(await deleteOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });

  it('should return an error if invalid filter', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
      database: {
        collection: jest.fn().mockReturnThis(),
        deleteOne: jest.fn().mockReturnThis(),
      },
    };

    expect(await deleteOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await deleteOne(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await deleteOne(defaults).catch((error: any) => error.message)).toBe(
      'Invalid filter provided.',
    );
    expect(await deleteOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });
});
