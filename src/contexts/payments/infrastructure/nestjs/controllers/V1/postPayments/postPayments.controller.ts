import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { CreatePaymentService } from 'src/contexts/payments/application/createPayment/createPayment.service';
import { PostPaymentsDto } from './postPayments.dto';
import { ErrorSavePaymentException } from 'src/contexts/payments/domain/errors/errorSavePayment.exception';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class PostPaymentsController {
  constructor(private readonly createPaymentService: CreatePaymentService) {}

  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Pago creado correctamente',
  })
  @Post()
  async createPayment(@Body() body: PostPaymentsDto) {
    try {
      return await this.createPaymentService.run(body);
    } catch (error) {
      if (error instanceof ErrorSavePaymentException) {
        throw new BadRequestException(error.message);
      }
      throw new ConflictException('Conflict on create payment');
    }
  }
}
