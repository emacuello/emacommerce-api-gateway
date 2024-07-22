import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserCreateService } from 'src/contexts/auth/application/userCreate/userCreate.service';
import { SingUpDto } from './signUp.dto';
import { ErrorCreateException } from 'src/contexts/auth/domain/errors/errorCreate.exception';
import { ApiTags } from '@nestjs/swagger';
import { AuthMicroservice } from 'src/contexts/auth/infrastructure/ms/authMicroservices';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class SigUpController {
  constructor(
    private client: UserCreateService,
    private client2: AuthMicroservice,
  ) {}
  @Post(V1_ROUTES.USER.SIGN_UP)
  async signIn(@Body() dto: SingUpDto) {
    try {
      return await this.client.run(dto);
    } catch (error) {
      if (error instanceof ErrorCreateException) {
        throw new BadRequestException(error.message);
      }
    }
  }

  // LUEGO BORRARLO_!!!!1!!
  @Get()
  async getAll() {
    return await this.client2.getAll();
  }
}
