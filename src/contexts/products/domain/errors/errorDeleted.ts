export class ErrorDeleteProductException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
