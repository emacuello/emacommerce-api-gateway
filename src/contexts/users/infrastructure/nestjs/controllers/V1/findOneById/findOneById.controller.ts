import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindOneByIdUseCase } from 'src/contexts/users/application/userFindOneById/userFindOnebyId.use-case';
import { UserNotFoundException } from 'src/contexts/users/domain/errors/not-found.exception';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/authorization.guard';

@ApiTags(V1_ROUTES.NAME)
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Controller(V1_ROUTES.BASE)
export class UserFindbyIdController {
  constructor(private readonly userFindbyIdUseCase: UserFindOneByIdUseCase) {}

  @ApiOperation({ summary: 'Listar un usuario por id' })
  @Get(V1_ROUTES.USER.FIND_ONE)
  async run(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Partial<PrimitiveUser>> {
    try {
      const result = await this.userFindbyIdUseCase.run({ id });
      return result;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
