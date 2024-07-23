import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { PAYMENT_SERVICE } from 'src/utils/ms/msNames';
import { DeletePaymentController } from '../controllers/V1/deletePayments/deletePayments.controller';
import { GetAllPaymentsController } from '../controllers/V1/getAllPayments/getAllPayments.controller';
import { GetOnePaymentController } from '../controllers/V1/getOnePayments/getOnePayments.controller';
import { PostPaymentsController } from '../controllers/V1/postPayments/postPayments.controller';
import { MicroserviceRepository } from '../../ms/microservice.repository';
import { CreatePaymentService } from 'src/contexts/payments/application/createPayment/createPayment.service';
import { DeletePaymentService } from 'src/contexts/payments/application/deletePayment/deletePayment.service';
import { FindAllPaymentService } from 'src/contexts/payments/application/findAllPayment/findAllPayment.service';
import { FindOnePaymentService } from 'src/contexts/payments/application/findOnePayment/findOneProduct.service';
import { PaymentsRepository } from 'src/contexts/payments/domain/repository/payments.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: envs.KAFKA_CLIENTID,
            brokers: [envs.KAFKA_URL],
          },
          consumer: {
            groupId: envs.KAFKA_CONSUMER,
          },
        },
      },
    ]),
  ],
  controllers: [
    DeletePaymentController,
    GetAllPaymentsController,
    GetOnePaymentController,
    PostPaymentsController,
  ],
  providers: [
    MicroserviceRepository,
    CreatePaymentService,
    DeletePaymentService,
    FindAllPaymentService,
    FindOnePaymentService,
    {
      provide: PaymentsRepository,
      useExisting: MicroserviceRepository,
    },
  ],
})
export class PaymentsModule {}
