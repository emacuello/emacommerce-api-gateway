import { PickType } from '@nestjs/swagger';
import { UserCreateControllerDto } from '../createUser/createUser.dto';

export class UserUpdateControllerDto extends PickType(UserCreateControllerDto, [
  'name',
  'address',
  'phone',
  'country',
  'city',
  'birthdate',
]) {}
