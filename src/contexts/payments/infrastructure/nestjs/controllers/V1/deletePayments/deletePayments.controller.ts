import {
  BadRequestException,
  ConflictException,
  Controller,
  Delete,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { DeletePaymentService } from 'src/contexts/payments/application/deletePayment/deletePayment.service';
import { ErrorDeletePaymentException } from 'src/contexts/payments/domain/errors/errorDeletePayment.exception';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/utils/guards/authorization.guard';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';

@ApiTags(V1_ROUTES.NAME)
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Controller(V1_ROUTES.BASE)
export class DeletePaymentController {
  constructor(private readonly deletePaymentService: DeletePaymentService) {}
  @ApiOperation({ summary: 'Elimina un pago por id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Se elimino el pago correctamente',
  })
  @Delete(V1_ROUTES.USER.DELETE)
  async deletePayment(@Param('id') id: string) {
    try {
      return await this.deletePaymentService.run({ id });
    } catch (error) {
      if (error instanceof ErrorDeletePaymentException) {
        throw new BadRequestException(error.message);
      }
      throw new ConflictException('Conflict on delete payment');
    }
  }
}
