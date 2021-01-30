import { isValidString } from '../utils/isValidString/isValidString';
import { badRequestError } from '../errors/badRequestError/badRequestError';

export function validateCollectionName({
  collectionName,
  ...props
}: {
  readonly collectionName: string;
  // eslint-disable-next-line functional/prefer-readonly-type
  [key: string]: any;
}): Promise<Record<string, any> | Promise<Error>> {
  return new Promise((resolve, reject) => {
    return isValidString(collectionName)
      ? resolve({ ...props, collectionName })
      : reject(badRequestError('Must provide a collection name.'));
  });
}
