import { USER_SERVICE } from 'src/utils/ms/msNames';
import { User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Inject } from '@nestjs/common';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class UserMicroservice extends UsersRepository {
  constructor(@Inject(USER_SERVICE) private client: ClientProxy) {
    super();
  }

  save(user: User): Promise<User> {
    const result = this.client.send('createUser', user);

    return firstValueFrom(result);
  }
  async delete(id: string): Promise<string> {
    const result = this.client.send('deleteUser', id);
    return firstValueFrom(result);
  }

  findAll(): Promise<User[]> {
    const result = this.client.send('findAllUsers', {});
    return firstValueFrom(result);
  }

  findById(id: string): Promise<User> {
    const result = this.client.send('findUserById', id);
    return firstValueFrom(result);
  }

  async update(user: User): Promise<string> {
    const result = this.client.send('updateUser', user);
    return firstValueFrom(result);
  }
}
