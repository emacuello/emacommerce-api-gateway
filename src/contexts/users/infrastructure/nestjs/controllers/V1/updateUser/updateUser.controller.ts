import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserUpdateUseCase } from 'src/contexts/users/application/userUpdate/userUpdate.use-case';
import { V1_ROUTES } from '../../routes';
import { UserUpdateControllerDto } from './updateUser.dto';

@Controller(V1_ROUTES.BASE)
export class UserUpdateController {
  constructor(private readonly userUpdateUseCase: UserUpdateUseCase) {}

  @Put(V1_ROUTES.USER.UPDATE)
  async run(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UserUpdateControllerDto,
  ) {
    return await this.userUpdateUseCase.run(dto, id);
  }
}
