import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserUpdateUseCase } from 'src/contexts/users/application/userUpdate/userUpdate.use-case';
import { V1_ROUTES } from '../../routes';
import { UserUpdateControllerDto } from './updateUser.dto';
import { ErrorUpdateException } from 'src/contexts/users/domain/errors/errorUpdate.exception';
import { RpcException } from '@nestjs/microservices';

@Controller(V1_ROUTES.BASE)
export class UserUpdateController {
  constructor(private readonly userUpdateUseCase: UserUpdateUseCase) {}

  @Put(V1_ROUTES.USER.UPDATE)
  async run(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UserUpdateControllerDto,
  ): Promise<string> {
    try {
      const result = await this.userUpdateUseCase.run(dto, id);
      return result;
    } catch (error) {
      if (error instanceof ErrorUpdateException) {
        throw new RpcException(error.message);
      }
    }
  }
}
