export type FindOneMethodInterface = {
  readonly collectionName: string;
  readonly database: Record<string, any>;
  readonly query?: Record<string, any>;
  readonly projection?: Record<string, 0 | 1>;
};
