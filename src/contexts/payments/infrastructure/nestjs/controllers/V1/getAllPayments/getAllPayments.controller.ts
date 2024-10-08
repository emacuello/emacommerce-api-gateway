import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { FindAllPaymentService } from 'src/contexts/payments/application/findAllPayment/findAllPayment.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/authorization.guard';

@ApiTags(V1_ROUTES.NAME)
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Controller(V1_ROUTES.BASE)
export class GetAllPaymentsController {
  constructor(private readonly getAllPaymentsService: FindAllPaymentService) {}

  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @Get()
  async getAllPayments() {
    try {
      return await this.getAllPaymentsService.run();
    } catch (error) {
      throw new BadRequestException('Error on get all payments');
    }
  }
}
