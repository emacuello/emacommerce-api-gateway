import { PartialType } from '@nestjs/swagger';
import { UserCreateControllerDto } from '../createUser/createUser.dto';

export class UserUpdateControllerDto extends PartialType(
  UserCreateControllerDto,
  {
    skipNullProperties: true,
  },
) {}
