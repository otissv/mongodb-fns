import { badRequestError } from '../errors/badRequestError/badRequestError';
import { objectHasProps } from '../utils/objectHasProps';

export function validateObject(key = '') {
  return (
    props: Record<string, any> = {},
  ): Promise<Record<string, any> | Promise<Error>> => {
    return new Promise((resolve, reject) => {
      return objectHasProps(props[key])
        ? resolve(props)
        : reject(badRequestError(`Invalid ${key} provided.`));
    });
  };
}
