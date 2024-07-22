import { BadRequestException, Inject } from '@nestjs/common';
import { Auth } from '../../domain/entities/Auth';
import { AuthRepository } from '../../domain/repository/auth.repository';
import { AUTH_SERVICE } from 'src/utils/ms/msNames';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class AuthMicroservice extends AuthRepository {
  constructor(@Inject(AUTH_SERVICE) private client: ClientProxy) {
    super();
  }
  async signIn(data: Auth): Promise<{ token: string }> {
    const userRegister = data.toValueSignIn();
    const result = this.client.send('signIn', userRegister);

    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async signUp(data: Auth): Promise<string> {
    const userRegister = data.toValueRegister();

    const result = this.client.send('signUp', userRegister);

    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async signSocial(): Promise<string> {
    const result = this.client.send('socialUser', {});

    return await firstValueFrom(result);
  }

  async getAll() {
    const result = this.client.send('getAll', {});
    return await firstValueFrom(result);
  }
}
