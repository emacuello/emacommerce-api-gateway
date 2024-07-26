import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import {
  AUTH_SERVICE,
  PAYMENT_SERVICE,
  PRODUCT_SERVICE,
  USER_SERVICE,
} from 'src/utils/ms/msNames';
import { envs } from './envs';

export const productsMicroserviceConfig: ClientProviderOptions = {
  name: PRODUCT_SERVICE,
  transport: Transport.MQTT,
  options: {
    url: envs.MQTT_URL,
  },
};

export const usersMicroserviceConfig: ClientProviderOptions = {
  name: USER_SERVICE,
  transport: Transport.NATS,
  options: {
    servers: [envs.NATS_SERVER_URL],
  },
};

export const paymentsMicroserviceConfig: ClientProviderOptions = {
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
};

export const authMicroserviceConfig: ClientProviderOptions = {
  name: AUTH_SERVICE,
  transport: Transport.RMQ,
  options: {
    urls: [envs.RMQ_SERVER_URL],
    queue: envs.RMQ_QUEUE,
    queueOptions: {
      durable: false,
    },
  },
};
