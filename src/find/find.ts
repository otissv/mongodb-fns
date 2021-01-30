import { FindMethodInterface } from './types.find';
import { pipePromise } from '../utils/pipePromise';
import { validateCollectionName } from '../validateCollectionName';
import { validateDatabase } from '../validateDatabase';
import { validateQuery } from '../validateQuery';
import { validateProjection } from '../validateProjection';

export async function mongodbFind<Props extends FindMethodInterface>({
  collectionName,
  database,
  projection = {},
  query = {},
}: Props): Promise<readonly unknown[]> {
  try {
    const docs: readonly unknown[] | null = await new Promise(
      (resolve, reject) => {
        return database
          .collection(collectionName)
          .find(query, projection)
          .toArray((error: any, docs: readonly any[]) => {
            if (error) {
              return reject(new Error(error));
            }

            return resolve(
              docs.map((doc: any) => ({ ...doc, _id: doc._id.toString() })),
            );
          });
      },
    );

    return docs || [];
  } catch (error) {
    return Promise.reject(await error);
  }
}

export async function find(props: FindMethodInterface): Promise<unknown> {
  const result = await pipePromise(
    validateCollectionName,
    validateDatabase,
    validateQuery,
    validateProjection,
    mongodbFind,
  )(props).catch((error: Error) => error);

  return result instanceof Error ? Promise.reject(result) : result;
}
