import { ObjectId } from 'mongodb';

import { DeleteMethodInterface } from './types.deleteOne';
import { pipePromise } from '../utils/pipePromise';
import { validateCollectionName } from '../validateCollectionName';
import { validateDatabase } from '../validateDatabase';
import { validateObject } from '../validateObject';

export async function mongodbDeleteOne<Props extends DeleteMethodInterface>({
  database,
  collectionName,
  filter,
}: Props): Promise<readonly unknown[]> {
  try {
    const doc = await database.collection(collectionName).deleteOne({
      ...filter,
      ...(filter._id ? { _id: new ObjectId(filter._id) } : {}),
    });

    return doc ? [doc] : [];
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteOne(
  props: DeleteMethodInterface,
): Promise<unknown> {
  const result = await pipePromise(
    validateCollectionName,
    validateDatabase,
    validateObject('filter'),
    mongodbDeleteOne,
  )(props).catch((error: Error) => error);

  return result instanceof Error ? Promise.reject(result) : result;
}
