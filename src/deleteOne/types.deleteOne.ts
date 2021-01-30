export type DeleteMethodInterface = {
  readonly collectionName: string;
  readonly database: Record<string, any>;
  readonly filter: { readonly _id: string };
};
