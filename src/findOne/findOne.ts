import { ObjectId } from 'mongodb';
import { pipePromise } from '../utils/pipePromise';
import { validateCollectionName } from '../validateCollectionName';
import { validateDatabase } from '../validateDatabase';
import { FindOneMethodInterface } from './types.findOne';
import { validateQuery } from '../validateQuery';
import { validateProjection } from '../validateProjection';

export async function mongodbFindOne<Props extends FindOneMethodInterface>({
  database,
  collectionName,
  query = {},
  projection = {},
}: Props): Promise<readonly unknown[]> {
  try {
    const doc = await database
      .collection(collectionName)
      .findOne(
        { ...query, ...(query._id ? { _id: new ObjectId(query._id) } : {}) },
        projection,
      );

    return doc ? [doc] : [];
  } catch (error) {
    return Promise.reject(await error);
  }
}

export async function findOne(props: FindOneMethodInterface): Promise<unknown> {
  const result = await pipePromise(
    validateCollectionName,
    validateDatabase,
    validateQuery,
    validateProjection,
    mongodbFindOne,
  )(props).catch((error: Error) => error);

  return result instanceof Error ? Promise.reject(result) : result;
}
