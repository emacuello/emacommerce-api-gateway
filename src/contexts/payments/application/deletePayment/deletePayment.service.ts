import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PaymentsRepository } from '../../domain/repository/payments.repository';
import { DeletePaymentDto } from './deletedPayment.dto';
import { ErrorDeletePaymentException } from '../../domain/errors/errorDeletePayment.exception';

@Injectable()
export class DeletePaymentService {
  constructor(private readonly paymentRepository: PaymentsRepository) {}

  async run(order: DeletePaymentDto): Promise<string> {
    const payment = await this.paymentRepository.delete(order.id);
    if (!payment) throw new ErrorDeletePaymentException('Payment not found');
    return payment;
  }
}
