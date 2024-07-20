import { Inject } from '@nestjs/common';
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
  signIn(data: Auth): Promise<{ token: string }> {
    const result = this.client.send('signIn', data);

    return firstValueFrom(result);
  }
  signUp(data: Auth): Promise<string> {
    const result = this.client.send('createUser', data);

    return firstValueFrom(result);
  }
  signSocial(): Promise<string> {
    const result = this.client.send('createUser', {});

    return firstValueFrom(result);
  }
}
