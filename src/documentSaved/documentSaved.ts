import { documentNotSavedError } from '../errors/documentNotSavedError/documentNotSavedError';

export function documentSaved(
  doc: Record<string, any>,
): Error | Record<string, any> {
  return doc.insertedCount === 0 || doc.n === 0
    ? Promise.reject(documentNotSavedError())
    : doc;
}
