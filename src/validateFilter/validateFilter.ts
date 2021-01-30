import { validateObject } from '../validateObject';

export function validateFilter(
  props: Record<string, any>,
): Record<string, any> {
  return props.filter == null
    ? {
        ...props,
        filter: {},
      }
    : validateObject('filter')(props);
}
