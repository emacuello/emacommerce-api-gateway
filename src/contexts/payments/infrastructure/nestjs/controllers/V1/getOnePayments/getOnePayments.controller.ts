import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { FindOnePaymentService } from 'src/contexts/payments/application/findOnePayment/findOneProduct.service';
import { NotFoundPaymentException } from 'src/contexts/payments/domain/errors/notFoundPayment.exception';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/authorization.guard';

@ApiTags(V1_ROUTES.NAME)
@Roles(Role.Admin, Role.User)
@UseGuards(RolesGuard)
@Controller(V1_ROUTES.BASE)
export class GetOnePaymentController {
  constructor(private readonly getOnePaymentService: FindOnePaymentService) {}

  @ApiOperation({ summary: 'Obtener un pago por id' })
  @Get(V1_ROUTES.USER.FIND_ONE)
  async getOnePayment(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.getOnePaymentService.run({ id });
    } catch (error) {
      if (error instanceof NotFoundPaymentException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Error on get one payment');
    }
  }
}
