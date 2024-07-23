import { BadRequestException, Controller, Get } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { FindAllPaymentService } from 'src/contexts/payments/application/findAllPayment/findAllPayment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
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
