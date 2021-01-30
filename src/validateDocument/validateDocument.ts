import { validateObject } from '../validateObject';

export function validateDocument(
  props: Record<string, any>,
): Record<string, any> {
  return props.document == null
    ? {
        ...props,
        document: {},
      }
    : validateObject('document')(props);
}
