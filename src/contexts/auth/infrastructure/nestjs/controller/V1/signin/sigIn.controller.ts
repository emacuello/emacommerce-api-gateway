import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserSignInService } from 'src/contexts/auth/application/userSingIn/userSigIn.service';
import { SingInDto } from './sigin.dto';
import { ErrorSignInException } from 'src/contexts/auth/domain/errors/errorSignIn.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class SigInController {
  constructor(private client: UserSignInService) {}
  @Post(V1_ROUTES.USER.SIGN_IN)
  signIn(@Body() dto: SingInDto) {
    if (!Boolean(dto.email || dto.username)) {
      throw new BadRequestException('Email or username is required');
    }

    try {
      return this.client.run(dto);
    } catch (error) {
      console.log('entro??');

      if (error instanceof ErrorSignInException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
