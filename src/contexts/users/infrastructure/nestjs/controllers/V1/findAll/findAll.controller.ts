import { Controller, Get, UseGuards } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindAllUseCase } from 'src/contexts/users/application/userFindAll/userFindAll';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/authorization.guard';

@ApiTags(V1_ROUTES.NAME)
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Controller(V1_ROUTES.BASE)
export class UserFindAllController {
  constructor(private readonly userFindAllUseCase: UserFindAllUseCase) {}

  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @Get()
  async run(): Promise<Partial<PrimitiveUser>[]> {
    return await this.userFindAllUseCase.run();
  }
}
