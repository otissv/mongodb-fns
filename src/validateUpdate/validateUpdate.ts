import { validateObject } from '../validateObject';

export function validateUpdate(
  props: Record<string, any>,
): Record<string, any> {
  return validateObject('update')({
    ...props,
    update: props.update == null ? {} : props.update,
  });
}
