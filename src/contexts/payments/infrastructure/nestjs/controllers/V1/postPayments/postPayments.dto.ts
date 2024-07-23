import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUUID } from 'class-validator';
import { ProductId } from 'src/contexts/payments/application/createPayment/createPayment.dto';

export class PostPaymentsDto {
  @ApiProperty({ example: '4d2936ae-4c37-420d-829a-c0f81d043119' })
  @IsUUID()
  userId: string;
  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;
  @ApiProperty({
    example: [
      { id: '4d2936ae-4c37-420d-829a-c0f81d043119' },
      { id: 'de217ef1-8116-4cb2-89d3-782f0def4e65' },
    ],
    description: 'Listado de productos',
  })
  @IsArray()
  products: ProductId[];
}
