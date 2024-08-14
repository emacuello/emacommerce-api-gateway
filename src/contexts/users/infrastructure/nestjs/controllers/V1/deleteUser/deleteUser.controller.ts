import {
  BadRequestException,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserDeleteUseCase } from 'src/contexts/users/application/userDelete/userDelete.use-case';
import { ErrorDeleteException } from 'src/contexts/users/domain/errors/errorDelete.exception';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/authorization.guard';

@ApiTags(V1_ROUTES.NAME)
@ApiBearerAuth()
@Roles(Role.Admin, Role.User)
@UseGuards(RolesGuard)
@Controller(V1_ROUTES.BASE)
export class UserDeleteController {
  constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario eliminado correctamente',
  })
  @Delete(V1_ROUTES.USER.DELETE)
  async run(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    try {
      const result = await this.userDeleteUseCase.run({ id });
      return result;
    } catch (error) {
      if (error instanceof ErrorDeleteException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
