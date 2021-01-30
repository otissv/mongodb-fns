import { validateObject } from '../validateObject';

export function validateProjection(
  props: Record<string, any>,
): Record<string, any> {
  return props.projection == null
    ? {
        ...props,
        projection: {},
      }
    : validateObject('projection')(props);
}
