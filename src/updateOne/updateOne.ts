import { ObjectId } from 'mongodb';

import { UpdateMethodInterface } from './types.updateOne';
import { documentExistsError } from '../errors/documentExistsError';
import { documentSaved } from '../documentSaved';
import { pipePromise } from '../utils/pipePromise';
import { validateCollectionName } from '../validateCollectionName';
import { validateDatabase } from '../validateDatabase';
import { validateUpdate } from '../validateUpdate';
import { validateFilter } from '../validateFilter';

export async function mongodbUpdateOne<Props extends UpdateMethodInterface>({
  database,
  collectionName,
  filter = {},
  update = {},
}: Props): Promise<readonly unknown[]> {
  try {
    const payload = { ...update };
    // eslint-disable-next-line functional/no-expression-statement,  functional/immutable-data
    delete payload._id;

    const doc = await database.collection(collectionName).updateOne(
      {
        ...filter,
        ...(filter._id ? { _id: new ObjectId(filter._id) } : {}),
      },
      { $set: update },
    );

    return doc ? [doc] : [];
  } catch (error) {
    return error.code === 11000
      ? Promise.reject(documentExistsError())
      : Promise.reject(await error);
  }
}

export async function updateOne(
  props: UpdateMethodInterface,
): Promise<unknown> {
  const result = await pipePromise(
    validateCollectionName,
    validateDatabase,
    validateFilter,
    validateUpdate,
    mongodbUpdateOne,
    documentSaved,
  )(props).catch((error: Error) => error);

  return result instanceof Error ? Promise.reject(result) : result;
}
