import { Body, Controller, Post } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserCreateUseCase } from 'src/contexts/users/application/userCreate/userCreate.use-case';
import { UserCreateControllerDto } from './createUser.dto';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';
import { Observable } from 'rxjs';

@Controller(V1_ROUTES.BASE)
export class UserCreateController {
  constructor(private userCreateUseCase: UserCreateUseCase) {}
  @Post()
  run(@Body() userDto: UserCreateControllerDto): Observable<{
    user: Partial<PrimitiveUser>;
  }> {
    return this.userCreateUseCase.run(userDto);
  }
}
