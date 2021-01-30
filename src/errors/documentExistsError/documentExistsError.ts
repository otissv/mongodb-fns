import { CustomError, CustomErrorInterface } from '../CustomError';
import { DOCUMENTS_EXISTS } from '../codes.error';

export function documentExistsError(
  message = 'Document Exists.',
): CustomErrorInterface {
  const error = new CustomError({
    code: DOCUMENTS_EXISTS,
    message,
  });

  return error;
}
