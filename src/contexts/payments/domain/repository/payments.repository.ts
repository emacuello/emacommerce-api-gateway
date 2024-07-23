import { Payment } from '../entities/Payment';

export abstract class PaymentsRepository {
  abstract getProducts(): Promise<Payment[]>;
  abstract findById(id: string): Promise<Payment>;
  abstract update(payment: Payment, id: string): Promise<string>;
  abstract save(payment: Payment): Promise<string>;
  abstract delete(id: string): Promise<string>;
}
