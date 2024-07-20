import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserDeleteUseCase } from 'src/contexts/users/application/userDelete/userDelete.use-case';

@Controller(V1_ROUTES.BASE)
export class UserDeleteController {
  constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}

  @Delete(V1_ROUTES.USER.DELETE)
  async run(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.userDeleteUseCase.run({ id });
  }
}
