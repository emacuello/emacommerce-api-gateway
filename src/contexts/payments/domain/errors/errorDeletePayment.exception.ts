export class ErrorDeletePaymentException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorDeletePaymentException';
  }
}
