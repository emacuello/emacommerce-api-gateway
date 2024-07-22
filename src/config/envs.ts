import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  PORT: number;
  NATS_SERVER_URL: string;
  RMQ_SERVER_URL: string;
  RMQ_QUEUE: string;
  MQTT_URL: string;
}
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVER_URL: joi.string().required(),
    RMQ_SERVER_URL: joi.string().required(),
    RMQ_QUEUE: joi.string().required(),
    MQTT_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;
