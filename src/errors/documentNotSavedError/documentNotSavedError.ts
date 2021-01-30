import { CustomError, CustomErrorInterface } from '../CustomError';
import { DOCUMENT_NOT_SAVED } from '../codes.error';

export function documentNotSavedError(
  message = 'Document was not saved.',
): CustomErrorInterface {
  const error = new CustomError({
    code: DOCUMENT_NOT_SAVED,
    message,
  });

  return error;
}
