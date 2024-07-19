import { Body, Controller, Post } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserCreateUseCase } from 'src/contexts/users/application/userCreate/userCreate.use-case';
import { UserCreateControllerDto } from './createUser.dto';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';

@Controller(V1_ROUTES.BASE)
export class UserCreateController {
  constructor(private userCreateUseCase: UserCreateUseCase) {}
  @Post()
  async run(@Body() userDto: UserCreateControllerDto): Promise<{
    user: Partial<PrimitiveUser>;
  }> {
    return await this.userCreateUseCase.run(userDto);
  }
}
