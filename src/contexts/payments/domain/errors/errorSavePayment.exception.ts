export class ErrorSavePaymentException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorSavePaymentException';
  }
}
