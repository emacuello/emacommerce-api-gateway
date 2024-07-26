import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsUUID, ValidateNested } from 'class-validator';

class UserDto {
  @ApiProperty({ example: '4d2936ae-4c37-420d-829a-c0f81d043119' })
  @IsUUID()
  id: string;
}

class ProductId {
  @ApiProperty({ example: '4d2936ae-4c37-420d-829a-c0f81d043119' })
  @IsUUID()
  id: string;
}
export class PostPaymentsDto {
  @ApiProperty({ example: { id: '4d2936ae-4c37-420d-829a-c0f81d043119' } })
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
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
  @ValidateNested({ each: true })
  @Type(() => ProductId)
  products: ProductId[];
}
