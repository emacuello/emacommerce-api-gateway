import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PaymentsRepository } from '../../domain/repository/payments.repository';
import { Inject, OnModuleInit } from '@nestjs/common';
import { PAYMENT_SERVICE } from 'src/utils/ms/msNames';
import { ClientKafka } from '@nestjs/microservices';
import { Payment, PrimitivePayment } from '../../domain/entities/Payment';
import { firstValueFrom } from 'rxjs';
import { ErrorSavePaymentException } from '../../domain/errors/errorSavePayment.exception';
import { ErrorDeletePaymentException } from '../../domain/errors/errorDeletePayment.exception';
import { NotFoundPaymentException } from '../../domain/errors/notFoundPayment.exception';

@Injectable()
export class MicroserviceRepository
  extends PaymentsRepository
  implements OnModuleInit
{
  constructor(@Inject(PAYMENT_SERVICE) private client: ClientKafka) {
    super();
  }
  private ParamsDto = {};
  async onModuleInit() {
    this.client.subscribeToResponseOf('create.payment');
    this.client.subscribeToResponseOf('delete.payment');
    this.client.subscribeToResponseOf('get.payment');
    this.client.subscribeToResponseOf('get.payments');
    await this.client.connect();
  }
  async save(payment: Payment): Promise<string> {
    const result = this.client.send('create.payment', payment.toValue());
    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new ErrorSavePaymentException(error);
    }
  }
  async delete(id: string): Promise<string> {
    const result = this.client.send('delete.payment', { id });
    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new ErrorDeletePaymentException(error);
    }
  }
  async findById(id: string): Promise<Payment> {
    const result = this.client.send('get.payment', { id });
    try {
      return Payment.create(await firstValueFrom(result));
    } catch (error) {
      throw new NotFoundPaymentException(error);
    }
  }
  async getProducts(): Promise<Payment[]> {
    const result = this.client.send('get.payments', {});
    try {
      const payments = (await firstValueFrom(result)) as PrimitivePayment[];

      return payments.map((payment) => Payment.create(payment));
    } catch (error) {
      throw new NotFoundPaymentException(error);
    }
  }
}
