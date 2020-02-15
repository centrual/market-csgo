import {ExtendableError} from 'ts-error';

export class UnexceptedError extends ExtendableError {
  constructor(errorMessage: string) {
    super();
    this.message = `Unexcepted error occured. Message: ${errorMessage}`;
  }
}
