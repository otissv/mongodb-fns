import { badRequestError } from '../errors/badRequestError/badRequestError';
import { objectHasProps } from '../utils/objectHasProps';

export function validateDatabase({
  database,
  ...props
}: {
  readonly database: Record<string, any>;
  // eslint-disable-next-line functional/prefer-readonly-type
  [key: string]: any;
}): Promise<Record<string, any> | Promise<Error>> {
  return new Promise((resolve, reject) => {
    return objectHasProps(database)
      ? resolve({ ...props, database })
      : reject(badRequestError('No database instance provided.'));
  });
}
