import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PaymentsRepository } from '../../domain/repository/payments.repository';
import { Payment } from '../../domain/entities/Payment';
import { CreatePaymentDto } from './createPayment.dto';
import { ErrorSavePaymentException } from '../../domain/errors/errorSavePayment.exception';

@Injectable()
export class CreatePaymentService {
  constructor(private readonly paymentRepository: PaymentsRepository) {}

  async run(order: CreatePaymentDto): Promise<string> {
    const payment = await this.paymentRepository.save(Payment.create(order));
    if (!payment) throw new ErrorSavePaymentException('Payment not created');
    return payment;
  }
}
