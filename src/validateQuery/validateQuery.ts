import { validateObject } from '../validateObject';

export function validateQuery(props: Record<string, any>): Record<string, any> {
  return props.query == null
    ? {
        ...props,
        query: {},
      }
    : validateObject('query')(props);
}
