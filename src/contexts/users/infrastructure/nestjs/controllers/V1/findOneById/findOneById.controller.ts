import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindOneByIdUseCase } from 'src/contexts/users/application/userFindOneById/userFindOnebyId.use-case';
import { UserNotFoundException } from 'src/contexts/users/domain/errors/not-found.exception';
import { RpcException } from '@nestjs/microservices';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';

@Controller(V1_ROUTES.BASE)
export class UserFindbyIdController {
  constructor(private readonly userFindbyIdUseCase: UserFindOneByIdUseCase) {}

  @Get(V1_ROUTES.USER.FIND_ONE)
  async run(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Partial<PrimitiveUser>> {
    try {
      const result = await this.userFindbyIdUseCase.run({ id });
      return result;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new RpcException(error.message);
      }
    }
  }
}
