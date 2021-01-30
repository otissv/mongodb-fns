export const BAD_REQUEST = 'BAD_REQUEST';
export const DOCUMENT_NOT_SAVED = 'DOCUMENT_NOT_SAVED';
export const DOCUMENTS_EXISTS = 'DOCUMENTS_EXISTS';
export const SERVER_ERROR = 'SERVER_ERROR';

export type StatusCodeTypes =
  | string
  | typeof BAD_REQUEST
  | typeof DOCUMENT_NOT_SAVED
  | typeof DOCUMENTS_EXISTS
  | typeof SERVER_ERROR;

export function getErrorStatus(code: StatusCodeTypes): 400 | 500 {
  switch (code) {
    case BAD_REQUEST:
      return 400;

    case DOCUMENT_NOT_SAVED:
    case DOCUMENTS_EXISTS:
    case SERVER_ERROR:
    default:
      return 500;
  }
}
