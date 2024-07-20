import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDeleteControllerDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;
}
