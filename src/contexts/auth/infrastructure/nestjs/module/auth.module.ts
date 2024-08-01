import { Module } from '@nestjs/common';
import { SigInController } from '../controller/V1/signin/sigIn.controller';
import { SigUpController } from '../controller/V1/signup/signUp.controller';
import { UserCreateService } from 'src/contexts/auth/application/userCreate/userCreate.service';
import { UserSignInService } from 'src/contexts/auth/application/userSingIn/userSigIn.service';
import { AuthRepository } from 'src/contexts/auth/domain/repository/auth.repository';
import { AuthMicroservice } from '../../ms/authMicroservices';
import { ClientsModule } from '@nestjs/microservices';
import { authMicroserviceConfig } from 'src/config/microservice.config';

@Module({
  imports: [ClientsModule.register([authMicroserviceConfig])],
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
