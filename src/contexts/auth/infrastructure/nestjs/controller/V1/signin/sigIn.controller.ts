import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserSignInService } from 'src/contexts/auth/application/userSingIn/userSigIn.service';
import { SingInDto } from './sigin.dto';
import { ErrorSignInException } from 'src/contexts/auth/domain/errors/errorSignIn.exception';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class SigInController {
  constructor(private client: UserSignInService) {}

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
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
