export type UpdateMethodInterface = {
  readonly collectionName: string;
  readonly database: Record<string, any>;
  readonly filter: { readonly _id?: string; readonly url?: string };
  readonly update: { readonly [key: string]: any };
};
