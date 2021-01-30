/* eslint-disable functional/no-expression-statement */

import { find } from './find';
import { BAD_REQUEST } from '../errors/codes.error';
describe('find', () => {
  const database = (docs: readonly Record<string, any>[]) => ({
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockReturnValue(docs),
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it.skip('should return a documents', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: '12345678',
        url: 'www.google.com',
      },
    ];

    const actual = await find({
      database: database(docs),
      collectionName: 'collectionName',
    });

    expect(actual).toEqual(docs);
  });

  it('should return an error if invalid collectionName', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: '27vm0c8s4',
        url: 'www.google.com',
      },
    ];

    const defaults: any = {
      database: database(docs),
    };

    expect(await find(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await find(defaults).catch((error: any) => error instanceof Error),
    ).toBe(true);
    expect(await find(defaults).catch((error: any) => error.message)).toBe(
      'Must provide a collection name.',
    );
    expect(await find(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
    expect(
      await find({ ...defaults, collectionName: '' }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await find({ ...defaults, collectionName: null }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await find({ ...defaults, collectionName: 1 }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
    expect(
      await find({ ...defaults, collectionName: true }).catch(
        (error: any) => error.code,
      ),
    ).toBe(BAD_REQUEST);
  });

  it('should return an error if invalid database', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
    };

    expect(await find(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await find(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await find(defaults).catch((error: any) => error.message)).toBe(
      'No database instance provided.',
    );
    expect(await find(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });

  it('should return an error if invalid query', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
      database: {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
      },
      query: true,
    };

    expect(await find(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await find(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await find(defaults).catch((error: any) => error.message)).toBe(
      'Invalid query provided.',
    );

    expect(await find(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });

  it('should return an error if invalid projection', async () => {
    const defaults: any = {
      collectionName: 'collectionName',
      database: {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
      },
      projection: true,
    };
    expect(await find(defaults).catch(() => 'caught')).toBe('caught');
    expect(
      await find(defaults).catch(async (error: any) => {
        return error instanceof Error;
      }),
    ).toBe(true);
    expect(await find(defaults).catch((error: any) => error.message)).toBe(
      'Invalid projection provided.',
    );
    expect(await find(defaults).catch((error: any) => error.code)).toBe(
      BAD_REQUEST,
    );
  });
});
