export class ErrorSignInException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
