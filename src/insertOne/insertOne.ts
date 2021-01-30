import { InsertMethodInterface } from './types.insertOne';
import { documentExistsError } from '../errors/documentExistsError';
import { documentSaved } from '../documentSaved';
import { documentToArray } from '../documentToArray';
import { pipePromise } from '../utils/pipePromise';
import { validateCollectionName } from '../validateCollectionName';
import { validateDatabase } from '../validateDatabase';
import { validateDocument } from '../validateDocument';

export async function mongodbInsertOne<Props extends InsertMethodInterface>({
  database,
  collectionName,
  document,
}: Props): Promise<readonly unknown[]> {
  try {
    return await database.collection(collectionName).insertOne(document);
  } catch (error) {
    return error.code === 11000
      ? Promise.reject(documentExistsError())
      : Promise.reject(await error);
  }
}

export async function insertOne(
  props: InsertMethodInterface,
): Promise<unknown> {
  const result = await pipePromise(
    validateCollectionName,
    validateDatabase,
    validateDocument,
    mongodbInsertOne,
    documentSaved,
    documentToArray,
  )(props).catch((error: Error) => error);

  return result instanceof Error ? Promise.reject(result) : result;
}
