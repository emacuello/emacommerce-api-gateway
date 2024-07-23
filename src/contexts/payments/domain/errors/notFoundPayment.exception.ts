export class NotFoundPaymentException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundPaymentException';
  }
}
