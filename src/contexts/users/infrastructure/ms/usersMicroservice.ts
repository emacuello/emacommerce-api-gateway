import { USER_SERVICE } from 'src/utils/ms/msNames';
import { PrimitiveUser, UpdateUser, User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BadRequestException, Inject } from '@nestjs/common';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class UserMicroservice extends UsersRepository {
  constructor(@Inject(USER_SERVICE) private client: ClientProxy) {
    super();
  }

  save(user: User): Promise<User> {
    console.log('LEGACY');

    const result = this.client.send('createUser', user);

    return firstValueFrom(result);
  }
  async delete(id: string): Promise<string> {
    const result = this.client.send('deleteUser', { id });
    try {
      const deleted = await firstValueFrom(result);
      console.log('deleted', deleted);
      return deleted;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    const result = this.client.send('findAllUsers', {});
    const users = (await firstValueFrom(result)) as PrimitiveUser[];
    const u = users.map((user) => new User(user));
    return u;
  }

  async findById(id: string): Promise<User> {
    const result = this.client.send('findUserById', { id });
    try {
      return new User(await firstValueFrom(result));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(user: UpdateUser, id: string): Promise<string> {
    const userToUpdate = user.toValue();
    userToUpdate.id = id;
    const result = this.client.send('updateUser', userToUpdate);
    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
