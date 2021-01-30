/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-expression-statement */

export type CustomErrorInterface = {
  code: string;
  message: string;
  info?: string;
};

// eslint-disable-next-line functional/no-class
export class CustomError extends Error {
  message = '';
  code = '';
  info: string | undefined;

  constructor({ code, message, info = '' }: CustomErrorInterface) {
    super();
    this.code = code;
    this.message = message;
    this.info = info;
  }
}
