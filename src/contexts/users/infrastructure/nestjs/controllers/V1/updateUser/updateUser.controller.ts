import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserUpdateUseCase } from 'src/contexts/users/application/userUpdate/userUpdate.use-case';
import { V1_ROUTES } from '../../routes';
import { UserUpdateControllerDto } from './updateUser.dto';
import { ErrorUpdateException } from 'src/contexts/users/domain/errors/errorUpdate.exception';
import { RpcException } from '@nestjs/microservices';
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
export class UserUpdateController {
  constructor(private readonly userUpdateUseCase: UserUpdateUseCase) {}

  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario actualizado correctamente',
  })
  @Put(V1_ROUTES.USER.UPDATE)
  async run(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UserUpdateControllerDto,
  ): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, ...rest } = dto;
      return await this.userUpdateUseCase.run(rest, id);
    } catch (error) {
      if (error instanceof ErrorUpdateException) {
        throw new RpcException(error.message);
      }
    }
  }
}
