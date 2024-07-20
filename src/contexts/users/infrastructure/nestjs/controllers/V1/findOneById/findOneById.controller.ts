import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindOneByIdUseCase } from 'src/contexts/users/application/userFindOneById/userFindOnebyId.use-case';

@Controller(V1_ROUTES.BASE)
export class UserFindbyIdController {
  constructor(private readonly userFindbyIdUseCase: UserFindOneByIdUseCase) {}

  @Get(V1_ROUTES.USER.FIND_ONE)
  async run(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userFindbyIdUseCase.run({ id });
  }
}
