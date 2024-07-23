import { IsUUID } from 'class-validator';

export class DeletePaymentDto {
  @IsUUID()
  id: string;
}
