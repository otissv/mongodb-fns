/* eslint-disable functional/no-expression-statement */
import { documentSaved } from './documentSaved';

describe('documentSaved', () => {
  it('should return inserted document', async () => {
    const actual = await documentSaved({
      insertedCount: 1,
      n: 1,
    });

    expect((actual as any).insertedCount).toBe(1);
    expect((actual as any).n).toBe(1);
  });

  it('should return error if document was not inserted', async () => {
    const actual: any = documentSaved({
      insertedCount: 0,
      n: 0,
    });

    actual.catch((error: any) => {
      expect(error.message).toBe('Document was not saved.');
      expect(error.code).toBe('DOCUMENT_NOT_SAVED');
    });
  });
});
