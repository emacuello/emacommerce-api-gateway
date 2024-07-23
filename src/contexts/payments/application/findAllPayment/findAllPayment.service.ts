import { PrimitivePayment } from '../../domain/entities/Payment';
import { PaymentsRepository } from '../../domain/repository/payments.repository';

export class FindAllPaymentService {
  constructor(private readonly paymentRepository: PaymentsRepository) {}
  async run(): Promise<PrimitivePayment[]> {
    const payments = await this.paymentRepository.getProducts();
    return payments.map((payment) => payment.toValue());
  }
}
