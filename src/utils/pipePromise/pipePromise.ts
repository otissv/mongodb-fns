/**
 * Evaluates functions in a left to right sequence. Where the return value of the previous function become the argument of the next function in the sequence
 *
 * @param   fns - Functions to be evaluated.
 * @returns Return a function that takes a single argument that will be mapped over.
 *
 * @usage
 * `import \{ pipePromise \} from "ufunc/pipePromise"`
 *
 * @example
 * ```
 * const toUpper = async (string: string) => string.toUpperCase();
 * const toSnake = async (string: string) => string.replace(' ', '_');
 *
 * pipePromise(toUpper, toSnake)('Hello World!') // "HELLO_WORLD!"
 * ```
 */
export function pipePromise<ReturnType>(
  ...fns: readonly Function[]
): <T>(value: T | Promise<T>) => Promise<ReturnType> {
  return async <T>(value: T | Promise<T>): Promise<any> => {
    // eslint-disable-next-line functional/no-try-statement
    try {
      return fns.length === 0
        ? await value
        : await pipePromise(...fns.slice(1, fns.length))(
            await fns[0](await value),
          );
    } catch (error) {
      return error;
    }
  };
}
