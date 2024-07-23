import { IsUUID } from 'class-validator';

export class GetOnePaymentDto {
  @IsUUID()
  id: string;
}
