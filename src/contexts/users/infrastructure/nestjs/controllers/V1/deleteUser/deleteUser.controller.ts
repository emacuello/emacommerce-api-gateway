import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserDeleteUseCase } from 'src/contexts/users/application/userDelete/userDelete.use-case';
import { ErrorDeleteException } from 'src/contexts/users/domain/errors/errorDelete.exception';
import { RpcException } from '@nestjs/microservices';

@Controller(V1_ROUTES.BASE)
export class UserDeleteController {
  constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}

  @Delete(V1_ROUTES.USER.DELETE)
  async run(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    try {
      const result = await this.userDeleteUseCase.run({ id });
      return result;
    } catch (error) {
      if (error instanceof ErrorDeleteException) {
        throw new RpcException(error.message);
      }
    }
  }
}
