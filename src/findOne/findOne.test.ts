/* eslint-disable functional/no-expression-statement */

import { findOne } from './findOne';
import { BAD_REQUEST } from '../errors/codes.error';
describe('findOne', () => {
  const database = (doc: Record<string, any>) => ({
    collection: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnValue(doc),
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

    const actual = await findOne({
      database: database(doc),
      collectionName: 'collectionName',
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

    expect(await findOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await findOne(defaults).catch((error: any) => error instanceof Error),
    ).toBe(true);
    expect(await findOne(defaults).catch((error: any) => error.message)).toBe(
      'Must provide a collection name.',
    );
    expect(await findOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
    expect(
      await findOne({ ...defaults, collectionName: '' }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await findOne({ ...defaults, collectionName: null }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await findOne({ ...defaults, collectionName: 1 }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await findOne({ ...defaults, collectionName: true }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
  });

  it('should return an error if invalid database', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
    };

    expect(await findOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await findOne(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await findOne(defaults).catch((error: any) => error.message)).toBe(
      'No database instance provided.',
    );
    expect(await findOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });

  it('should return an error if invalid query', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
      database: {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockReturnThis(),
      },
      query: true,
    };

    expect(await findOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await findOne(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await findOne(defaults).catch((error: any) => error.message)).toBe(
      'Invalid query provided.',
    );

    expect(await findOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });

  it('should return an error if invalid projection', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
      database: {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockReturnThis(),
      },
      projection: true,
    };

    expect(await findOne(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await findOne(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await findOne(defaults).catch((error: any) => error.message)).toBe(
      'Invalid projection provided.',
    );

    expect(await findOne(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });
});
