import { Module } from '@nestjs/common';
import { UserCreateController } from '../controllers/V1/createUser/createUser.controllers';
import { UserCreateUseCase } from 'src/contexts/users/application/userCreate/userCreate.use-case';
import { UsersRepository } from 'src/contexts/users/domain/repository/users.repository';
import { UserMicroservice } from '../../ms/usersMicroservice';
import { UserDeleteUseCase } from 'src/contexts/users/application/userDelete/userDelete.use-case';
import { UserFindAllUseCase } from 'src/contexts/users/application/userFindAll/userFindAll';
import { UserFindOneByIdUseCase } from 'src/contexts/users/application/userFindOneById/userFindOnebyId.use-case';
import { UserUpdateUseCase } from 'src/contexts/users/application/userUpdate/userUpdate.use-case';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/utils/ms/msNames';
import { UserFindAllController } from '../controllers/V1/findAll/findAll.controller';
import { UserDeleteController } from '../controllers/V1/deleteUser/deleteUser.controller';
import { UserFindbyIdController } from '../controllers/V1/findOneById/findOneById.controller';
import { UserUpdateController } from '../controllers/V1/updateUser/updateUser.controller';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [envs.NATS_SERVER_URL],
        },
      },
    ]),
  ],
  controllers: [
    UserCreateController,
    UserFindAllController,
    UserDeleteController,
    UserFindbyIdController,
    UserUpdateController,
  ],
  providers: [
    UserCreateUseCase,
    UserDeleteUseCase,
    UserFindAllUseCase,
    UserFindOneByIdUseCase,
    UserUpdateUseCase,
    UserMicroservice,
    {
      provide: UsersRepository,
      useExisting: UserMicroservice,
    },
  ],
})
export class UsersModule {}
