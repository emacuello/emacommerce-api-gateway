import { PrimitivePayment } from '../../domain/entities/Payment';
import { NotFoundPaymentException } from '../../domain/errors/notFoundPayment.exception';
import { PaymentsRepository } from '../../domain/repository/payments.repository';
import { FindOnePaymentDto } from './findOnePayment.dto';

export class FindOnePaymentService {
  constructor(private readonly paymentRepository: PaymentsRepository) {}
  async run({ id }: FindOnePaymentDto): Promise<PrimitivePayment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) throw new NotFoundPaymentException('Payment not found');
    return payment.toValue();
  }
}
