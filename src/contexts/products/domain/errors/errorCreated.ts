export class ErrorCreateProductException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
