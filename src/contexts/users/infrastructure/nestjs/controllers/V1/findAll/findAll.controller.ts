import { Controller, Get } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindAllUseCase } from 'src/contexts/users/application/userFindAll/userFindAll';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';

@Controller(V1_ROUTES.BASE)
export class UserFindAllController {
  constructor(private readonly userFindAllUseCase: UserFindAllUseCase) {}

  @Get()
  async run(): Promise<Partial<PrimitiveUser>[]> {
    return await this.userFindAllUseCase.run();
  }
}
