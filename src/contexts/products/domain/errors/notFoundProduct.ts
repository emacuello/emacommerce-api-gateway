export class NotFoundProductException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
