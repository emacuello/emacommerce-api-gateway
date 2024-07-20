import { Module } from '@nestjs/common';
import { SigInController } from '../controller/V1/signin/sigin.controller';
import { SigUpController } from '../controller/V1/signup/signup.controller';
import { UserCreateService } from 'src/contexts/auth/application/userCreate/userCreate.service';
import { UserSignInService } from 'src/contexts/auth/application/userSingIn/userSigIn.service';
import { AuthRepository } from 'src/contexts/auth/domain/repository/auth.repository';
import { AuthMicroservice } from '../../ms/authMicroservices';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/utils/ms/msNames';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.RMQ_SERVER_URL],
          queue: envs.RMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [SigInController, SigUpController],
  providers: [
    UserCreateService,
    UserSignInService,
    AuthMicroservice,
    {
      provide: AuthRepository,
      useExisting: AuthMicroservice,
    },
  ],
})
export class AuthModule {}
