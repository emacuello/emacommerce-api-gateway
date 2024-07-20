import { Body, Controller, Post } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserCreateService } from 'src/contexts/auth/application/userCreate/userCreate.service';
import { SingUpDto } from './signUp.dto';
import { ErrorCreateException } from 'src/contexts/auth/domain/errors/errorCreate.exception';
import { RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class SigUpController {
  constructor(private client: UserCreateService) {}
  @Post(V1_ROUTES.USER.SIGN_UP)
  async signIn(@Body() dto: SingUpDto) {
    try {
      return await this.client.run(dto);
    } catch (error) {
      if (error instanceof ErrorCreateException) {
        throw new RpcException(error.message);
      }
    }
  }
}
